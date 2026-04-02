"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";

const FASES = [
  {
    titulo: "Fase 1: Trazos Fundamentales",
    descripcion: "Ejercicios de grafomotricidad para el control inicial del trazo. Líneas, curvas y patrones básicos.",
    etiqueta: "Principiante",
    color: "#3B82F6",
    archivo: "/recursos/fase1.png"
  },
  {
    titulo: "Fase 2: El Alfabeto Completo",
    descripcion: "Guía completa de letras mayúsculas y minúsculas con indicadores de dirección.",
    etiqueta: "Intermedio",
    color: "#1E293B",
    archivo: "/recursos/fase2.png"
  },
  {
    titulo: "Fase 3: Fluidez y Frases",
    descripcion: "Práctica de caligrafía aplicada a frases comunes para mejorar la conexión entre letras.",
    etiqueta: "Avanzado",
    color: "#F59E0B",
    archivo: "/recursos/fase3.png"
  }
];

export default function Cuadernillos() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDownload = (archivo: string, titulo: string) => {
    const link = document.createElement('a');
    link.href = archivo;
    link.download = `${titulo.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.click();
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.hero} glass`} style={{ maxWidth: "1100px", padding: "3rem" }}>
        <h1 className={styles.title} style={{ fontSize: "2.5rem" }}>Catálogo Técnico de Recursos</h1>
        <p className={styles.subtitle}>
          Material de alta calidad diseñado para el desarrollo progresivo de la escritura manual.
        </p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem", 
          margin: "3rem 0",
          textAlign: "left"
        }}>
          {FASES.map((fase, i) => (
            <div key={i} style={{ 
              background: "white", 
              padding: "2rem", 
              borderRadius: "var(--radius-lg)",
              border: `1px solid #E2E8F0`,
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ 
                  background: i === 2 ? "var(--color-accent)" : "var(--color-primary)", 
                  color: "#fff", 
                  padding: "4px 12px", 
                  borderRadius: "4px", 
                  fontSize: "0.75rem", 
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>{fase.etiqueta}</span>
                <h3 style={{ marginTop: "1rem", color: "var(--color-text)", fontSize: "1.3rem" }}>{fase.titulo}</h3>
                <p style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "0.5rem", lineHeight: "1.5" }}>{fase.descripcion}</p>
              </div>
              
              <div style={{ position: "relative", width: "100%", height: "180px", backgroundColor: "#f8fafc", borderRadius: "var(--radius-sm)", marginBottom: "1.5rem", border: "1px solid #f1f5f9", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setPreview(fase.archivo)}>
                <Image src={fase.archivo} alt={fase.titulo} fill style={{ objectFit: "cover", opacity: 0.8 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.05)" }}>
                  <span style={{ background: "white", padding: "8px 16px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600, boxShadow: "var(--shadow-sm)" }}>Vista Previa</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.8rem", marginTop: "auto" }}>
                <button 
                  onClick={() => handleDownload(fase.archivo, fase.titulo)}
                  className="btn-primary" 
                  style={{ flex: 1, padding: "10px" }}
                >
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Previsualización */}
        {preview && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }} onClick={() => setPreview(null)}>
            <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%", backgroundColor: "white", borderRadius: "var(--radius-lg)", overflow: "auto" }}>
               <img src={preview} style={{ display: "block", width: "auto", height: "auto", maxWidth: "100%" }} alt="Preview" />
               <button style={{ position: "absolute", top: "1rem", right: "1rem", background: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem", boxShadow: "var(--shadow-md)" }}>×</button>
            </div>
          </div>
        )}

        <div style={{ 
          padding: "2.5rem", 
          backgroundColor: "#F1F5F9", 
          borderRadius: "var(--radius-lg)", 
          marginTop: "2rem",
          textAlign: "center",
          border: "1px solid #E2E8F0"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>¿Buscas algo específico?</h2>
          <p style={{ color: "#475569" }}>Utiliza nuestra herramienta avanzada para generar recursos personalizados con el texto que necesites.</p>
          <Link href="/generador" className="btn-primary" style={{ marginTop: "1.5rem", padding: "14px 40px" }}>
            Abrir Generador de Recursos →
          </Link>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            &larr; Volver al Panel Principal
          </Link>
        </div>
      </div>
    </main>
  );
}
