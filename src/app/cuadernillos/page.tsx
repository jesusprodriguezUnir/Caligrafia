"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";

const CATEGORIAS_MAGICAS = [
  { id: 1, titulo: "Preescritura", emoji: "🌀", desc: "¡Controla tu mano mágica con trazos y ondas!", archivo: "/test-cuadernos/1-test.pdf" },
  { id: 2, titulo: "Vocales Mayúsculas", emoji: "🅰️", desc: "A, E, I, O, U en grande para gritar fuerte.", archivo: "/test-cuadernos/2-test.pdf" },
  { id: 3, titulo: "Abecedario Mayúsculas", emoji: "🔠", desc: "¡Todas las letras gigantes de la A a la Z!", archivo: "/test-cuadernos/3-test.pdf" },
  { id: 4, titulo: "Vocales Minúsculas", emoji: "ᵃ", desc: "A, e, i, o, u pequeñitas y saltarinas.", archivo: "/test-cuadernos/4-test.pdf" },
  { id: 5, titulo: "Abecedario Minúsculas", emoji: "🔡", desc: "¡Todas las letras pequeñas para escribir cuentos!", archivo: "/test-cuadernos/5-test.pdf" },
  { id: 6, titulo: "Palabras Mayúsculas", emoji: "🍎", desc: "¡Escribe tus primeras palabras en grande!", archivo: "/test-cuadernos/6-test.pdf" },
  { id: 7, titulo: "Palabras Minúsculas", emoji: "☀️", desc: "¡Aprende a escribir palabras de verdad!", archivo: "/test-cuadernos/7-test.pdf" },
  { id: 8, titulo: "Frases Mayúsculas", emoji: "📢", desc: "¡Construye mensajes importantes en gigante!", archivo: "/test-cuadernos/8-test.pdf" },
  { id: 9, titulo: "Frases Minúsculas", emoji: "💬", desc: "¡Escribe frases bonitas para tus amigos!", archivo: "/test-cuadernos/9-test.pdf" },
  { id: 10, titulo: "Textos Mágicos", emoji: "📖", desc: "¡Conviértete en un gran escritor de historias!", archivo: "/test-cuadernos/10-test.pdf" },
];

export default function Cuadernillos() {
  const [activeTab, setActiveTab] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);

  const currentCategory = CATEGORIAS_MAGICAS.find(c => c.id === activeTab);

  const handleDownload = (archivo?: string, titulo?: string) => {
    if (!archivo) return;
    const link = document.createElement('a');
    link.href = archivo;
    link.download = `${titulo || 'cuaderno'}.pdf`;
    link.click();
  };

  return (
    <main className={styles.main} style={{ fontFamily: "var(--font-main)" }}>
      <div className={`${styles.hero}`} style={{ 
        maxWidth: "1250px", 
        padding: "3.5rem", 
        border: "var(--border-thick)", 
        borderRadius: "var(--radius-lg)", 
        boxShadow: "var(--shadow-flat)", 
        background: "white",
        margin: "0 auto"
      }}>
        
        <h1 className={styles.title} style={{ fontSize: "3.5rem", color: "var(--color-primary)", fontWeight: 900 }}>
          <span style={{ fontFamily: "var(--font-hand)", color: "var(--color-secondary)", fontSize: "1.5rem", display: "block" }}>¡El Tesoro de las Letras!</span>
          EL COFRE DE <span style={{ color: "var(--color-secondary)" }}>CUADERNOS</span> 🎁
        </h1>
        
        <p className={styles.subtitle} style={{ fontSize: "1.2rem", color: "#475569", fontWeight: 600, marginBottom: "3rem" }}>
          ¡Elige tu aventura favorita y empieza a dibujar letras mágicas hoy mismo! ✨
        </p>

        {/* Sistema de 10 Pestañas Play Fun style */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "3rem" }}>
          {CATEGORIAS_MAGICAS.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "15px",
                border: "var(--border-thick)",
                backgroundColor: activeTab === cat.id ? "var(--color-secondary)" : "white",
                color: activeTab === cat.id ? "white" : "var(--color-primary)",
                fontWeight: 900,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.1s",
                boxShadow: activeTab === cat.id ? "4px 4px 0px #0369A1" : "4px 4px 0px #1A1A1A",
                transform: activeTab === cat.id ? "translate(2px, 2px)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{cat.emoji === "sol" ? "☀️" : cat.emoji === "APPLE" ? "🍎" : cat.emoji}</span>
              {cat.titulo}
            </button>
          ))}
        </div>

        {/* Sección de Contenido Activo */}
        <div style={{ 
          background: "white", 
          padding: "3rem", 
          borderRadius: "30px", 
          border: "4px solid #1A1A1A",
          textAlign: "center",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)"
        }}>
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontSize: "4.5rem" }}>{currentCategory?.emoji === "sol" ? "☀️" : currentCategory?.emoji === "APPLE" ? "🍎" : currentCategory?.emoji}</span>
            <h2 style={{ fontSize: "2.8rem", color: "var(--color-primary)", fontWeight: 900, marginTop: "1rem" }}>
              Nivel {currentCategory?.id}: {currentCategory?.titulo}
            </h2>
            <p style={{ fontSize: "1.5rem", color: "var(--color-secondary)", fontWeight: 400, fontFamily: "var(--font-hand)" }}>{currentCategory?.desc}</p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "2.5rem",
            justifyItems: "center"
          }}>
            {[1, 2, 3].map(item => (
              <div key={item} style={{ 
                background: "white", 
                padding: "2rem", 
                borderRadius: "20px", 
                border: "var(--border-thick)",
                boxShadow: "6px 6px 0px #E2E8F0",
                width: "100%",
                maxWidth: "340px"
              }}>
                <div style={{ 
                  width: "100%", 
                  height: "220px", 
                  backgroundColor: "#F8FAFC", 
                  borderRadius: "15px", 
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4.5rem",
                  border: "2px dashed #CBD5E1"
                }}>
                   {currentCategory?.emoji}
                </div>
                <h4 style={{ fontWeight: 900, color: "var(--color-primary)", fontSize: "1.3rem" }}>Cuaderno Mágico {currentCategory?.id}.{item}</h4>
                <div style={{ display: "flex", gap: "12px", marginTop: "1.5rem" }}>
                  <button 
                    onClick={() => setPreview(currentCategory?.archivo || null)}
                    style={{ flex: 1, backgroundColor: "white", color: "var(--color-primary)", borderRadius: "12px", padding: "12px", fontWeight: 900, border: "3px solid #1A1A1A", cursor: "pointer", boxShadow: "4px 4px 0px #1A1A1A" }}
                  >
                    🔍 Ver &gt;
                  </button>
                  <button 
                    onClick={() => handleDownload(currentCategory?.archivo, `${currentCategory?.titulo}-${item}`)}
                    className="btn-primary" 
                    style={{ flex: 2, borderRadius: "12px", padding: "12px", fontWeight: 900, fontSize: "1.1rem", backgroundColor: "var(--color-secondary)", border: "3px solid #1A1A1A", color: "white", boxShadow: "4px 4px 0px #0369A1" }}
                  >
                    📥 Bajar &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Previsualización Mágico Play Fun style */}
        {preview && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(182, 225, 232, 0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ position: "relative", width: "95%", height: "92%", backgroundColor: "white", borderRadius: "30px", overflow: "hidden", display: "flex", flexDirection: "column", border: "var(--border-thick)", boxShadow: "15px 15px 0px rgba(0,0,0,0.2)" }}>
               <div style={{ padding: "1.5rem 2.5rem", borderBottom: "var(--border-thick)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC" }}>
                 <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--color-primary)" }}>
                   ✨ <span style={{ fontFamily: "var(--font-hand)" }}>Echando un vistazo</span> ✨
                 </h3>
                 <button 
                  onClick={() => setPreview(null)}
                  style={{ background: "white", border: "var(--border-thick)", borderRadius: "10px", width: "50px", height: "50px", cursor: "pointer", fontWeight: "900", color: "var(--color-primary)", fontSize: "1.5rem", boxShadow: "4px 4px 0px #1A1A1A" }}>X</button>
               </div>
               <iframe 
                src={`${preview}#toolbar=0`} 
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Preview Cuaderno"
               />
            </div>
          </div>
        )}

        {/* Enlaces a otras zonas mágicas */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginTop: "5rem"
        }}>
          <div style={{ 
            padding: "2.5rem", 
            backgroundColor: "#F0FDFA", 
            borderRadius: "40px", 
            textAlign: "center",
            border: "4px dashed #2DD4BF"
          }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "#0D9488", fontWeight: 800 }}>¿Quieres tus frases?</h2>
            <p style={{ color: "#0F766E", fontSize: "1rem", fontWeight: 600 }}>¡Usa el Generador Mágico para escribir lo que quieras!</p>
            <Link href="/generador" className="btn-primary" style={{ marginTop: "1.5rem", width: "100%", padding: "15px", borderRadius: "50px", backgroundColor: "#0D9488", boxShadow: "0 6px 0px #0F766E" }}>
              🪄 Abrir Generador
            </Link>
          </div>

          <div style={{ 
            padding: "2.5rem", 
            backgroundColor: "#FAF5FF", 
            borderRadius: "40px", 
            textAlign: "center",
            border: "4px dashed #A855F7"
          }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "#7E22CE", fontWeight: 800 }}>Mega Colección 🚀</h2>
            <p style={{ color: "#6B21A8", fontSize: "1rem", fontWeight: 600 }}>¡Tenemos más de 80 cuadernos históricos para ti!</p>
            <Link href="/coleccion-completa" className="btn-primary" style={{ marginTop: "1.5rem", width: "100%", padding: "15px", borderRadius: "50px", backgroundColor: "#7E22CE", boxShadow: "0 6px 0px #6B21A8" }}>
              🌈 Explorar Todo
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "4rem" }}>
          <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "1.1rem", textDecoration: "underline", textUnderlineOffset: "4px" }}>
            🏠 ¡Volver a mi Casa!
          </Link>
        </div>

      </div>
    </main>
  );
}
