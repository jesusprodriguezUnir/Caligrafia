import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

type ProcessResult = {
  fileName: string;
  success: boolean;
  outputPath?: string;
  error?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function isPdf(path: string) {
  return path.toLowerCase().endsWith(".pdf");
}

async function listAllPdfPaths(
  storageClient: ReturnType<typeof createClient>,
  bucket: string,
  prefix = ""
): Promise<string[]> {
  const stack: string[] = [prefix];
  const files: string[] = [];

  while (stack.length > 0) {
    const currentPrefix = stack.pop() || "";
    const { data, error } = await storageClient.storage.from(bucket).list(currentPrefix, {
      limit: 1000,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      throw new Error(`No se pudo listar ${bucket}/${currentPrefix}: ${error.message}`);
    }

    for (const entry of data || []) {
      const nextPath = currentPrefix ? `${currentPrefix}/${entry.name}` : entry.name;

      if (entry.metadata === null) {
        stack.push(nextPath);
        continue;
      }

      if (isPdf(nextPath)) {
        files.push(nextPath);
      }
    }
  }

  return files;
}

function outputPathFor(sourcePdfPath: string, outputPrefix: string) {
  const safeName = sourcePdfPath.replace(/[\\/]/g, "_").replace(/\.pdf$/i, "");
  return `${outputPrefix}/${safeName}/cuadernillo-premium.pdf`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return jsonResponse(
      {
        success: false,
        error: "Faltan SUPABASE_URL, SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY",
      },
      500
    );
  }

  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return jsonResponse({ success: false, error: "Authorization header requerido" }, 401);
  }

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: authError } = await userClient.auth.getUser();
  if (authError || !userData.user) {
    return jsonResponse({ success: false, error: "Token invalido o expirado" }, 401);
  }

  const roleFromAppMetadata = userData.user.app_metadata?.role;
  const roleFromUserMetadata = userData.user.user_metadata?.role;
  const isAdmin = roleFromAppMetadata === "admin" || roleFromUserMetadata === "admin";

  if (!isAdmin) {
    return jsonResponse({ success: false, error: "Acceso denegado: admin requerido" }, 403);
  }

  const sourceBucket = Deno.env.get("PDF_SOURCE_BUCKET") || "recursos";
  const outputBucket = Deno.env.get("PDF_OUTPUT_BUCKET") || sourceBucket;
  const sourcePrefix = Deno.env.get("PDF_SOURCE_PREFIX") || "";
  const outputPrefix = Deno.env.get("PDF_OUTPUT_PREFIX") || "processed";

  const storageClient = createClient(supabaseUrl, supabaseServiceRoleKey);

  let pdfPaths: string[] = [];
  try {
    pdfPaths = await listAllPdfPaths(storageClient, sourceBucket, sourcePrefix);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudieron listar PDFs";
    return jsonResponse({ success: false, error: message }, 500);
  }

  const results: ProcessResult[] = [];

  for (const sourcePath of pdfPaths) {
    const destinationPath = outputPathFor(sourcePath, outputPrefix);
    const fileName = sourcePath.split("/").pop() || sourcePath;

    try {
      const { error: removeError } = await storageClient.storage
        .from(outputBucket)
        .remove([destinationPath]);

      if (removeError && !removeError.message.toLowerCase().includes("not found")) {
        throw removeError;
      }

      const { error: copyError } = await storageClient.storage
        .from(sourceBucket)
        .copy(sourcePath, destinationPath);

      if (copyError) {
        throw copyError;
      }

      results.push({ fileName, success: true, outputPath: `${outputBucket}/${destinationPath}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      results.push({ fileName, success: false, error: message });
    }
  }

  return jsonResponse({
    success: true,
    message: `Procesamiento completado: ${results.length} archivos`,
    results,
  });
});