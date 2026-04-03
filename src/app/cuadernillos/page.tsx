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
    <main className={styles.main} style={{ background: "#E0F2FE", backgroundImage: "radial-gradient(#BAE6FD 2px, transparent 2px)", backgroundSize: "40px 40px" }}>
      <div className={`${styles.hero} glass`} style={{ maxWidth: "1200px", padding: "3rem", border: "8px solid white", borderRadius: "50px", boxShadow: "var(--shadow-lg)", background: "white" }}>
        
        <h1 className={styles.title} style={{ fontSize: "3.5rem", color: "var(--color-primary)", fontWeight: 900 }}>¡El Cofre de los Cuadernos! 🎁</h1>
        <p className={styles.subtitle} style={{ fontSize: "1.3rem", color: "#475569", fontWeight: 600, marginBottom: "3rem" }}>
          ¡Elige tu aventura favorita y empieza a dibujar letras mágicas hoy mismo! ✨
        </p>

        {/* Sistema de 10 Pestañas Infantiles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "3rem" }}>
          {CATEGORIAS_MAGICAS.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: "1rem 1.5rem",
                borderRadius: "50px",
                border: "none",
                backgroundColor: activeTab === cat.id ? "var(--color-primary)" : "#F1F5F9",
                color: activeTab === cat.id ? "white" : "#64748B",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.1s",
                boxShadow: activeTab === cat.id ? "0 5px 0px #0369A1" : "0 5px 0px #CBD5E1",
                transform: activeTab === cat.id ? "translateY(2px)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{cat.emoji === "sol" ? "☀️" : cat.emoji === "APPLE" ? "🍎" : cat.emoji}</span>
              {cat.titulo}
            </button>
          ))}
        </div>

        {/* Sección de Contenido Activo */}
        <div style={{ 
          background: "#F8FAFC", 
          padding: "3rem", 
          borderRadius: "40px", 
          border: "5px dashed var(--color-secondary)",
          textAlign: "center",
          animation: "fadeIn 0.4s ease-out"
        }}>
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontSize: "4rem" }}>{currentCategory?.emoji === "sol" ? "☀️" : currentCategory?.emoji === "APPLE" ? "🍎" : currentCategory?.emoji}</span>
            <h2 style={{ fontSize: "2.5rem", color: "var(--color-secondary)", fontWeight: 900, marginTop: "1rem" }}>
              Nivel {currentCategory?.id}: {currentCategory?.titulo}
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#64748B", fontWeight: 600 }}>{currentCategory?.desc}</p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "2rem",
            justifyItems: "center"
          }}>
            {/* Aquí simulamos los cuadernos disponibles para cada categoría */}
            {[1, 2, 3].map(item => (
              <div key={item} style={{ 
                background: "white", 
                padding: "1.5rem", 
                borderRadius: "30px", 
                border: "4px solid #E2E8F0",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                width: "100%",
                maxWidth: "320px"
              }}>
                <div style={{ 
                  width: "100%", 
                  height: "200px", 
                  backgroundColor: "#F1F5F9", 
                  borderRadius: "20px", 
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  border: "2px dashed #CBD5E1"
                }}>
                   {currentCategory?.emoji}
                </div>
                <h4 style={{ fontWeight: 800, color: "#334155", fontSize: "1.2rem" }}>Cuaderno #{currentCategory?.id}.{item}</h4>
                <div style={{ display: "flex", gap: "10px", marginTop: "1.2rem" }}>
                  <button 
                    onClick={() => setPreview(currentCategory?.archivo || null)}
                    style={{ flex: 1, backgroundColor: "#F1F5F9", color: "#64748B", borderRadius: "50px", padding: "12px", fontWeight: 800, border: "2px solid #E2E8F0", cursor: "pointer" }}
                  >
                    🔍 Ver
                  </button>
                  <button 
                    onClick={() => handleDownload(currentCategory?.archivo, `${currentCategory?.titulo}-${item}`)}
                    className="btn-primary" 
                    style={{ flex: 2, borderRadius: "50px", padding: "14px", fontWeight: 800, fontSize: "1.1rem", boxShadow: "0 6px 0px #0369A1" }}
                  >
                    📥 Bajar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Previsualización Mágico */}
        {preview && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ position: "relative", width: "90%", height: "90%", backgroundColor: "white", borderRadius: "40px", overflow: "hidden", display: "flex", flexDirection: "column", border: "8px solid var(--color-primary)" }}>
               <div style={{ padding: "1.5rem 2rem", borderBottom: "4px dashed #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC" }}>
                 <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--color-primary)" }}>✨ Vista Previa Mágica ✨</h3>
                 <button 
                  onClick={() => setPreview(null)}
                  style={{ background: "#38BDF8", border: "none", borderRadius: "50%", width: "45px", height: "45px", cursor: "pointer", fontWeight: "bold", color: "white", fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 0px #0369A1" }}>×</button>
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
