/**
 * db-manager.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Script de gestión de base de datos para entornos de prueba.
 * Permite generar datos de prueba (seed) y reiniciar el estado (reset).
 *
 * Uso:
 *   npx tsx scripts/db-manager.ts seed    → Genera registros de prueba
 *   npx tsx scripts/db-manager.ts reset   → Limpia todos los datos de prueba
 *   npx tsx scripts/db-manager.ts status  → Muestra el estado actual
 *
 * Requiere variables de entorno en .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY  (para operaciones admin: reset, seed)
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// ─── Cargar variables de entorno ────────────────────────────────────────────
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn("⚠️  No se encontró .env.local ni .env. Usando variables del sistema.");
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// ─── Configuración de buckets ────────────────────────────────────────────────
const SOURCE_BUCKET = process.env.PDF_SOURCE_BUCKET || "recursos";
const OUTPUT_BUCKET = process.env.PDF_OUTPUT_BUCKET || SOURCE_BUCKET;
const OUTPUT_PREFIX = process.env.PDF_OUTPUT_PREFIX || "processed";

// ─── Datos de prueba ─────────────────────────────────────────────────────────
interface TestUser {
  email: string;
  password: string;
  role: string;
  name: string;
}

const TEST_USERS: TestUser[] = [
  {
    email: "admin@caligrafiate-test.com",
    password: "TestAdmin2024!",
    role: "admin",
    name: "Admin de Prueba",
  },
  {
    email: "maestra@caligrafiate-test.com",
    password: "TestMaestra2024!",
    role: "user",
    name: "Maestra de Prueba",
  },
  {
    email: "alumno@caligrafiate-test.com",
    password: "TestAlumno2024!",
    role: "user",
    name: "Alumno de Prueba",
  },
];

interface GeneratedConfig {
  id: string;
  name: string;
  formato: string;
  margen: string;
  tipoLetra: string;
  contenido: string[];
  createdAt: string;
}

const SAMPLE_CONFIGS: GeneratedConfig[] = [
  {
    id: "config-test-001",
    name: "Ficha de Vocales - Nivel Inicial",
    formato: "pauta-guiada",
    margen: "con",
    tipoLetra: "escolar",
    contenido: ["vocalesMay", "vocalesMin"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "config-test-002",
    name: "Alfabeto Completo - Pauta Normal",
    formato: "pauta-normal",
    margen: "sin",
    tipoLetra: "imprenta",
    contenido: ["alfabetoMay", "alfabetoMin", "silabas"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "config-test-003",
    name: "Cuadrícula Libre - Textos",
    formato: "cuadricula-5",
    margen: "con",
    tipoLetra: "punteada",
    contenido: ["palabras", "frases", "textos"],
    createdAt: new Date().toISOString(),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function log(level: "info" | "ok" | "warn" | "error", msg: string) {
  const icons = { info: "ℹ️ ", ok: "✅", warn: "⚠️ ", error: "❌" };
  console.log(`${icons[level]}  ${msg}`);
}

function validateEnv() {
  if (!SUPABASE_URL) {
    throw new Error(
      "Falta NEXT_PUBLIC_SUPABASE_URL. Configúrala en .env.local"
    );
  }
  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      "Falta NEXT_PUBLIC_SUPABASE_ANON_KEY. Configúrala en .env.local"
    );
  }
}

function validateServiceRole() {
  if (!SERVICE_ROLE_KEY) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY. Necesaria para operaciones de admin.\n" +
        "Añádela a .env.local: SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key"
    );
  }
}

// ─── Funciones principales ───────────────────────────────────────────────────

async function seed() {
  log("info", "Iniciando generación de datos de prueba...\n");
  validateEnv();
  validateServiceRole();

  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1. Crear usuarios de prueba
  log("info", "Creando usuarios de prueba...");
  let usersCreated = 0;
  let usersSkipped = 0;

  for (const user of TEST_USERS) {
    const { data, error } = await adminClient.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { role: user.role, name: user.name },
      app_metadata: { role: user.role },
    });

    if (error) {
      if (error.message?.includes("already exists") || error.message?.includes("already registered")) {
        log("warn", `Usuario ya existe: ${user.email} (omitiendo)`);
        usersSkipped++;
      } else {
        log("error", `Error creando ${user.email}: ${error.message}`);
      }
    } else {
      log("ok", `Usuario creado: ${user.email} (rol: ${user.role})`);
      usersCreated++;
    }
  }

  console.log(`\n   📊 Usuarios: ${usersCreated} creados, ${usersSkipped} ya existían\n`);

  // 2. Reportar configuraciones de prueba disponibles
  log("info", "Configuraciones de prueba disponibles (en memoria):");
  for (const cfg of SAMPLE_CONFIGS) {
    console.log(`   • ${cfg.name} (${cfg.formato}, ${cfg.tipoLetra})`);
  }

  // 3. Status del bucket de storage
  log("info", `\nVerificando bucket de storage: "${SOURCE_BUCKET}"...`);
  const { data: bucketData, error: bucketError } = await adminClient.storage
    .from(SOURCE_BUCKET)
    .list("", { limit: 5 });

  if (bucketError) {
    log("warn", `No se pudo acceder al bucket "${SOURCE_BUCKET}": ${bucketError.message}`);
    log("info", "Esto es normal si el bucket aún no tiene archivos.");
  } else {
    const fileCount = bucketData?.length || 0;
    log("ok", `Bucket "${SOURCE_BUCKET}": ${fileCount} archivo(s) encontrado(s)`);
  }

  console.log("\n" + "─".repeat(60));
  log("ok", "¡Datos de prueba generados correctamente!");
  console.log("\n📋 Credenciales de acceso:");
  for (const u of TEST_USERS) {
    console.log(`   ${u.role.padEnd(6)} → ${u.email} / ${u.password}`);
  }
  console.log("─".repeat(60) + "\n");
}

async function reset() {
  log("warn", "⚠️  RESET: Esto eliminará TODOS los datos de prueba.\n");

  // Verificar que no estamos en producción
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === "production") {
    throw new Error("❌ RESET bloqueado en entorno de producción.");
  }

  validateEnv();
  validateServiceRole();

  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1. Eliminar usuarios de prueba
  log("info", "Eliminando usuarios de prueba...");
  let usersDeleted = 0;

  const { data: usersData, error: listError } =
    await adminClient.auth.admin.listUsers();

  if (listError) {
    log("error", `No se pudo listar usuarios: ${listError.message}`);
  } else {
    const testEmails = TEST_USERS.map((u) => u.email);
    const toDelete = (usersData?.users || []).filter((u) =>
      testEmails.includes(u.email || "")
    );

    for (const u of toDelete) {
      const { error } = await adminClient.auth.admin.deleteUser(u.id);
      if (error) {
        log("error", `Error eliminando ${u.email}: ${error.message}`);
      } else {
        log("ok", `Usuario eliminado: ${u.email}`);
        usersDeleted++;
      }
    }
  }

  // 2. Limpiar archivos procesados del bucket de output
  log("info", `\nLimpiando archivos procesados del bucket "${OUTPUT_BUCKET}/${OUTPUT_PREFIX}"...`);

  const { data: processedFiles, error: listStorageError } = await adminClient.storage
    .from(OUTPUT_BUCKET)
    .list(OUTPUT_PREFIX, { limit: 1000 });

  if (listStorageError) {
    log("warn", `No se pudo listar archivos procesados: ${listStorageError.message}`);
  } else if (processedFiles && processedFiles.length > 0) {
    const paths = processedFiles.map((f) => `${OUTPUT_PREFIX}/${f.name}`);
    const { error: removeError } = await adminClient.storage
      .from(OUTPUT_BUCKET)
      .remove(paths);

    if (removeError) {
      log("warn", `Error al limpiar archivos: ${removeError.message}`);
    } else {
      log("ok", `${paths.length} archivo(s) procesado(s) eliminado(s)`);
    }
  } else {
    log("info", "No hay archivos procesados que limpiar.");
  }

  console.log("\n" + "─".repeat(60));
  log("ok", `Reset completado. ${usersDeleted} usuario(s) eliminado(s).`);
  console.log("─".repeat(60) + "\n");
}

async function status() {
  log("info", "Estado del entorno de pruebas\n");
  validateEnv();

  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Verificar conexión
  console.log(`   🌐 URL: ${SUPABASE_URL}`);
  console.log(`   🔑 Service Role Key: ${SERVICE_ROLE_KEY ? "✅ configurada" : "❌ no configurada"}`);

  if (SERVICE_ROLE_KEY) {
    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await adminClient.auth.admin.listUsers();
    if (error) {
      log("error", `No se puede listar usuarios: ${error.message}`);
    } else {
      const testEmails = TEST_USERS.map((u) => u.email);
      const testUsers = (data?.users || []).filter((u) =>
        testEmails.includes(u.email || "")
      );
      console.log(`\n   👥 Usuarios de prueba en Supabase: ${testUsers.length}/${TEST_USERS.length}`);
      for (const u of testUsers) {
        console.log(`      • ${u.email} (${u.app_metadata?.role || "sin rol"})`);
      }
    }

    const { data: bucketFiles } = await adminClient.storage
      .from(SOURCE_BUCKET)
      .list("", { limit: 5 });
    console.log(`\n   📁 Bucket "${SOURCE_BUCKET}": ${bucketFiles?.length || 0} archivo(s)`);
  }

  console.log("\n   📝 Configuraciones de prueba disponibles:", SAMPLE_CONFIGS.length);
  console.log();
}

// ─── CLI ─────────────────────────────────────────────────────────────────────
const command = process.argv[2];

async function main() {
  console.log("\n🎨 Caligrafía Mágica — Gestor de Base de Datos\n" + "═".repeat(50) + "\n");

  switch (command) {
    case "seed":
      await seed();
      break;
    case "reset":
      await reset();
      break;
    case "status":
      await status();
      break;
    default:
      console.log("Uso: npx tsx scripts/db-manager.ts [seed|reset|status]\n");
      console.log("  seed    → Crea usuarios y datos de prueba en Supabase");
      console.log("  reset   → Elimina todos los datos de prueba");
      console.log("  status  → Muestra el estado actual del entorno\n");
      process.exit(1);
  }
}

main().catch((err) => {
  log("error", err.message || String(err));
  process.exit(1);
});
