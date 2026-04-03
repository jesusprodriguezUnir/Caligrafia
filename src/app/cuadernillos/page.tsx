"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";

const CATEGORIAS_MAGICAS = [
  { id: 1, titulo: "Preescritura", emoji: "🌀", desc: "¡Controla tu mano mágica con trazos y ondas!", ejercicios: ["Trazos en Zig-Zag", "Líneas de Montañas", "Ondas del Mar"] },
  { id: 2, titulo: "Vocales Mayúsculas", emoji: "🅰️", desc: "A, E, I, O, U en grande para gritar fuerte.", ejercicios: ["Vocal A y E", "Vocal I y O", "Vocal U y Repaso"] },
  { id: 3, titulo: "Abecedario Mayúsculas", emoji: "🔠", desc: "¡Todas las letras gigantes de la A a la Z!", ejercicios: ["Letras A a la D", "Letras E a la H", "De la I a la L"] },
  { id: 4, titulo: "Vocales Minúsculas", emoji: "ᵃ", desc: "A, e, i, o, u pequeñitas y saltarinas.", ejercicios: ["Vocales a, e", "Vocales i, o", "Vocal u"] },
  { id: 5, titulo: "Abecedario Minúsculas", emoji: "🔡", desc: "¡Todas las letras pequeñas para escribir cuentos!", ejercicios: ["Letras a, b, c", "Letras d, e, f", "Letras g, h, i"] },
  { id: 6, titulo: "Palabras Mayúsculas", emoji: "🍎", desc: "¡Escribe tus primeras palabras en grande!", ejercicios: ["MAMÁ Y PAPÁ", "EL SOL", "LA LUNA"] },
  { id: 7, titulo: "Palabras Minúsculas", emoji: "☀️", desc: "¡Aprende a escribir palabras de verdad!", ejercicios: ["casa y perro", "sol y luna", "mami y papi"] },
  { id: 8, titulo: "Frases Mayúsculas", emoji: "📢", desc: "¡Construye mensajes importantes en gigante!", ejercicios: ["EL SOL BRILLA", "HOLA AMIGO", "JUGAR ES DIVERTIDO"] },
  { id: 9, titulo: "Frases Minúsculas", emoji: "💬", desc: "¡Escribe frases bonitas para tus amigos!", ejercicios: ["mi gato es lindo", "me gusta leer", "el cielo es azul"] },
  { id: 10, titulo: "Textos Mágicos", emoji: "📖", desc: "¡Conviértete en un gran escritor de historias!", ejercicios: ["El Dragón Azul", "El Hada Rosa", "El Bosque Mágico"] },
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
            {[1, 2, 3].map(item => {
              const archivoPath = `/test-cuadernos/${currentCategory?.id}.${item}-test.pdf`;
              const nombreEjercicio = currentCategory?.ejercicios[item-1];
              return (
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
                  <h4 style={{ fontWeight: 900, color: "var(--color-primary)", fontSize: "1.3rem" }}>Reto: {nombreEjercicio}</h4>
                  <div style={{ display: "flex", gap: "12px", marginTop: "1.5rem" }}>
                    <button 
                      onClick={() => setPreview(archivoPath)}
                      style={{ flex: 1, backgroundColor: "white", color: "var(--color-primary)", borderRadius: "12px", padding: "12px", fontWeight: 900, border: "3px solid #1A1A1A", cursor: "pointer", boxShadow: "4px 4px 0px #1A1A1A" }}
                    >
                      🔍 Ver &gt;
                    </button>
                    <button 
                      onClick={() => handleDownload(archivoPath, `${nombreEjercicio}`)}
                      className="btn-primary" 
                      style={{ flex: 2, borderRadius: "12px", padding: "12px", fontWeight: 900, fontSize: "1.1rem", backgroundColor: "var(--color-secondary)", border: "3px solid #1A1A1A", color: "white", boxShadow: "4px 4px 0px #0369A1" }}
                    >
                      📥 Bajar &gt;
                    </button>
                  </div>
                </div>
              );
            })}
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
          gridTemplateColumns: "minmax(300px, 560px)",
          gap: "2rem",
          marginTop: "5rem",
          justifyContent: "center"
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
