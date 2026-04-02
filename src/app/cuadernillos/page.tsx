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

const ESPECIALIDADES = [
  {
    titulo: "Módulo 123: Dominio Numérico",
    descripcion: "Ejercicios especializados para el trazado correcto de números del 0 al 9.",
    etiqueta: "Numérica",
    color: "#10B981", // Emerald
    archivo: "/recursos/numeros.png"
  },
  {
    titulo: "Taller: Escritura Creativa",
    descripcion: "Desarrollo de la narrativa y caligrafía libre a través de disparadores creativos.",
    etiqueta: "Creatividad",
    color: "#8B5CF6", // Violet
    archivo: "/recursos/creatividad.png"
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
      <div className={`${styles.hero} glass`} style={{ maxWidth: "1160px", padding: "4rem" }}>
        <h1 className={styles.title} style={{ fontSize: "2.8rem" }}>Catálogo Técnico de Recursos</h1>
        <p className={styles.subtitle}>
          Material de alta calidad diseñado para el desarrollo progresivo de la escritura y habilidades numéricas.
        </p>
        
        <h2 style={{ textAlign: "left", margin: "2rem 0 1rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem", color: "var(--color-secondary)" }}>Fases de Aprendizaje</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "2rem", 
          marginBottom: "4rem",
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
              </div>

              <button 
                onClick={() => handleDownload(fase.archivo, fase.titulo)}
                className="btn-primary" 
                style={{ marginTop: "auto", width: "100%" }}
              >
                Descargar Material
              </button>
            </div>
          ))}
        </div>

        <h2 style={{ textAlign: "left", margin: "2rem 0 1rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem", color: "var(--color-secondary)" }}>Módulos Especializados</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "2rem", 
          marginBottom: "3rem",
          textAlign: "left"
        }}>
          {ESPECIALIDADES.map((esp, i) => (
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
                  background: esp.color, 
                  color: "#fff", 
                  padding: "4px 12px", 
                  borderRadius: "4px", 
                  fontSize: "0.75rem", 
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>{esp.etiqueta}</span>
                <h3 style={{ marginTop: "1rem", color: "var(--color-text)", fontSize: "1.3rem" }}>{esp.titulo}</h3>
                <p style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "0.5rem", lineHeight: "1.5" }}>{esp.descripcion}</p>
              </div>
              
              <div style={{ position: "relative", width: "100%", height: "180px", backgroundColor: "#f8fafc", borderRadius: "var(--radius-sm)", marginBottom: "1.5rem", border: "1px solid #f1f5f9", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setPreview(esp.archivo)}>
                <Image src={esp.archivo} alt={esp.titulo} fill style={{ objectFit: "cover", opacity: 0.8 }} />
              </div>

              <button 
                onClick={() => handleDownload(esp.archivo, esp.titulo)}
                className="btn-primary" 
                style={{ marginTop: "auto", width: "100%", backgroundColor: esp.color, color: "white" }}
              >
                Descargar Módulo
              </button>
            </div>
          ))}
        </div>

        {/* Modal de Previsualización */}
        {preview && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }} onClick={() => setPreview(null)}>
            <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%", backgroundColor: "white", borderRadius: "var(--radius-lg)", overflow: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
               <img src={preview} style={{ display: "block", width: "auto", height: "auto", maxWidth: "100%" }} alt="Preview" />
               <button style={{ position: "absolute", top: "1rem", right: "1rem", background: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem", color: "var(--color-text)" }}>×</button>
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
