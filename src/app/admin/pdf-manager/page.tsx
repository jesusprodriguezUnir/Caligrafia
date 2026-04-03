"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../../page.module.css";
import { getSupabaseClient } from "@/utils/supabase/client";

interface ProcessResult {
  fileName: string;
  success: boolean;
  outputPath?: string;
  error?: string;
}

interface ProcessResponse {
  success: boolean;
  message?: string;
  results?: ProcessResult[];
  error?: string;
}

const PROCESS_FUNCTION_NAME =
  process.env.NEXT_PUBLIC_SUPABASE_PROCESS_PDFS_FUNCTION || "process-pdfs";

export default function PDFManager() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProcessResult[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const startProcessing = async () => {
    setLoading(true);
    setStatus("running");
    setErrorMessage("");

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.functions.invoke<ProcessResponse>(PROCESS_FUNCTION_NAME, {
        body: {},
      });

      if (error) {
        throw new Error(error.message || "No se pudo ejecutar la función de procesamiento");
      }

      if (data?.success) {
        setResults(data.results || []);
        setStatus("success");
      } else {
        setErrorMessage(data?.error || "La función devolvió un error");
        setStatus("error");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error inesperado al procesar PDFs";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main} style={{ minHeight: "100vh", backgroundColor: "#E0F2FE", color: "#334155", backgroundImage: "radial-gradient(#BAE6FD 2px, transparent 2px)", backgroundSize: "30px 30px" }}>
      <div className="hero glass" style={{ maxWidth: "900px", width: "100%", padding: "3rem", margin: "2rem auto", background: "rgba(255, 255, 255, 0.95)", border: "4px dashed #7DD3FC", borderRadius: "30px", boxShadow: "0 20px 25px -5px rgba(56, 189, 248, 0.2)", animation: "fadeIn 0.6s ease-out" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ backgroundColor: "#F472B6", color: "white", padding: "8px 20px", borderRadius: "30px", fontSize: "0.9rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 4px 6px rgba(244, 114, 182, 0.3)" }}>
                🚀 Tablero de Control Secreto 🤫
            </span>
            <h1 style={{ fontSize: "3rem", fontWeight: "800", marginTop: "1.5rem", color: "#0284C7", textShadow: "2px 2px 0px #BAE6FD" }}>
                Fábrica de Cuadernos Mágicos 🎨
            </h1>
            <p style={{ color: "#475569", marginTop: "1rem", fontSize: "1.2rem", fontWeight: "500" }}>
                ¡Transforma los cuadernos aburridos en aventuras súper divertidas con un solo clic!
            </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
            <button 
                onClick={startProcessing} 
                disabled={loading}
                className="btn-primary" 
                style={{ 
                    padding: "20px 50px", 
                    fontSize: "1.3rem", 
                    fontWeight: "800",
                    color: "white",
                    backgroundColor: status === "running" ? "#94A3B8" : "#22C55E",
                    border: status === "running" ? "none" : "4px solid #16A34A",
                    borderRadius: "50px", 
                    boxShadow: status === "running" ? "none" : "0 10px 0px #16A34A",
                    transition: "all 0.1s ease",
                    transform: status === "running" ? "translateY(10px)" : "none",
                    cursor: status === "running" ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "⚙️ Fabricando Magia..." : "✨ ¡CREAR CUADERNOS! ✨"}
            </button>
        </div>

        {status === "success" && (
            <div style={{ animation: "fadeIn 0.4s ease-out" }}>
                <div style={{ backgroundColor: "#FEF08A", border: "3px solid #FDE047", padding: "1.5rem", borderRadius: "20px", marginBottom: "2rem", color: "#854D0E", textAlign: "center", fontSize: "1.2rem", fontWeight: "700", boxShadow: "0 4px 6px rgba(253, 224, 71, 0.3)" }}>
                    🎉 ¡YAY! ¡Hemos creado {results.length} cuadernos nuevos! 🎈
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                    {results.map((res: ProcessResult, idx: number) => (
                        <div key={idx} style={{ 
                            background: "white", 
                            padding: "1rem 1.5rem", 
                            borderRadius: "16px", 
                            border: "2px solid #E2E8F0",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div>
                                <h4 style={{ fontWeight: "700", color: "#334155", fontSize: "1.1rem" }}>{res.fileName}.pdf 🌟</h4>
                                <p style={{ fontSize: "0.85rem", color: "#94A3B8", marginTop: "4px" }}>Guardado en: {res.outputPath}</p>
                            </div>
                            <span style={{ fontSize: "0.9rem", fontWeight: "bold", color: res.success ? "#15803D" : "#B91C1C", backgroundColor: res.success ? "#DCFCE7" : "#FEE2E2", padding: "6px 14px", borderRadius: "20px", border: `2px solid ${res.success ? '#86EFAC' : '#FCA5A5'}` }}>
                                {res.success ? "¡LISTO! ✅" : "UPS! ❌"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {status === "error" && (
            <div style={{ color: "#B91C1C", fontSize: "1.2rem", fontWeight: "bold", textAlign: "center", padding: "2rem", background: "#FEE2E2", border: "4px dashed #F87171", borderRadius: "20px" }}>
                <div>¡Oh no! 🐵 Algo se ha roto. ¡Avisa a los mecánicos!</div>
                {errorMessage && (
                  <p style={{ marginTop: "0.75rem", fontSize: "1rem", fontWeight: 600 }}>
                    {errorMessage}
                  </p>
                )}
            </div>
        )}

        <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/" style={{ color: "#3B82F6", fontSize: "1.1rem", fontWeight: "800", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                🚀 Volver a la Nave Principal
            </Link>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
