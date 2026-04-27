"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
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
  const [isChangingTab, setIsChangingTab] = useState(false);

  const currentCategory = CATEGORIAS_MAGICAS.find(c => c.id === activeTab);
    const { theme } = useTheme();

  const handleTabChange = (id: number) => {
    if (id === activeTab) return;
    setIsChangingTab(true);
    setActiveTab(id);
    setTimeout(() => setIsChangingTab(false), 500); // Simulación de carga
  };

  const handleDownload = (archivo?: string, titulo?: string) => {
    if (!archivo) return;
    const link = document.createElement('a');
    link.href = archivo;
    link.download = `${titulo || 'cuaderno'}.pdf`;
    link.click();
  };

  return (
    <main style={{ minHeight: "100vh", fontFamily: "var(--font-main)", background: "var(--color-background)" }}>
      <Header />
      <div style={{ 
        maxWidth: "1250px", 
        margin: "0 auto",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)",
      }}>
        {/* Page header — varía por tema */}
        {theme === "tinta" ? (
          <>
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "var(--font-hand)", fontStyle: "italic", color: "var(--color-cta)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Biblioteca de ejercicios</p>
              <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--color-primary)", lineHeight: 1.1 }}>Colección de Cuadernos</h1>
              <p style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "1.05rem" }}>Selecciona una categoría y descarga tus ejercicios de caligrafía.</p>
            </div>
          </>
        ) : theme === "studio" ? (
          <>
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-cta)", textTransform: "uppercase" as const, letterSpacing: "1.5px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-cta)", display: "inline-block" }} />
                COLECCIÓN DE FICHAS
              </p>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--color-primary)", lineHeight: 1.15 }}>Fichas por categoría</h1>
              <p style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "1.05rem" }}>10 categorías organizadas por nivel. Descarga en PDF listo para imprimir.</p>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "var(--color-primary)", fontWeight: 900, marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-hand)", color: "var(--color-secondary)", fontSize: "1.5rem", display: "block" }}>¡El Tesoro de las Letras!</span>
              EL COFRE DE <span style={{ color: "var(--color-secondary)" }}>CUADERNOS</span> 🎁
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#475569", fontWeight: 600, marginBottom: "2rem" }}>¡Elige tu aventura favorita y empieza a dibujar letras mágicas hoy mismo! ✨</p>
          </>
        )}

        {/* Sistema de 10 Pestañas Resposive */}
        <div style={{ 
          display: "flex", 
          overflowX: "auto", 
          gap: "12px", 
          padding: "10px 5px 20px", 
          marginBottom: "2rem",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }} className="hide-scrollbar">
          {CATEGORIAS_MAGICAS.map(cat => (
            <button 
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              style={{
                flexShrink: 0,
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
              <span style={{ fontSize: "1.2rem" }}>{cat.emoji}</span>
              {cat.titulo}
            </button>
          ))}

        </div>

        {/* Sección de Contenido Activo */}
        <div style={{ 
          background: "white", 
          padding: "clamp(1.5rem, 5vw, 3rem)", 
          border: "var(--border-thick)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
            boxShadow: "var(--shadow-soft)",
           minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: isChangingTab ? "center" : "flex-start",
          position: "relative"
        }}>
          {isChangingTab ? (
            <div style={{ textAlign: "center" }}>
              <div className="loader-orbit" style={{ margin: "0 auto 1.5rem" }}></div>
              <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.8rem", color: "var(--color-secondary)" }}>Abriendo el cofre...</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "2.5rem" }}>
                <span style={{ fontSize: "5rem", display: "inline-block", transform: "scale(1.2)" }}>{currentCategory?.emoji}</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)", color: "var(--color-primary)", fontWeight: 900, marginTop: "1.5rem" }}>
                  Nivel {currentCategory?.id}: {currentCategory?.titulo}
                </h2>
                <p style={{ fontSize: "1.5rem", color: "var(--color-secondary)", fontWeight: 400, fontFamily: "var(--font-hand)" }}>{currentCategory?.desc}</p>
              </div>

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
                gap: "2rem",
                justifyItems: "center"
              }}>
                {[1, 2, 3].map(item => {
                  const archivoPath = `/test-cuadernos/${currentCategory?.id}.${item}-test.pdf`;
                  const nombreEjercicio = currentCategory?.ejercicios[item-1];
                  return (
                    <div key={item} style={{ 
                      background: "#F8FAFC", 
                      padding: "1.5rem", 
                      borderRadius: "24px", 
                      border: "var(--border-thick)",
                      transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      width: "100%",
                      maxWidth: "340px",
                      position: "relative",
                      zIndex: 1
                    }} className="card-hover-effect">
                      <div style={{ 
                        width: "100%", 
                        height: "200px", 
                        backgroundColor: "white", 
                        borderRadius: "18px", 
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        border: "2px solid #E2E8F0"
                      }}>
                         <div style={{ fontSize: "4.5rem", zIndex: 1 }}>{currentCategory?.emoji}</div>
                         {/* Mock lines background */}
                         <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "repeating-linear-gradient(#0EA5E9 0px, #0EA5E9 1px, transparent 1px, transparent 20px)", pointerEvents: "none" }}></div>
                      </div>
                      <h4 style={{ fontWeight: 900, color: "var(--color-primary)", fontSize: "1.2rem", height: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{nombreEjercicio}</h4>
                      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                        <button 
                          onClick={() => setPreview(archivoPath)}
                          style={{ flex: 1, backgroundColor: "white", color: "var(--color-primary)", borderRadius: "14px", padding: "10px", fontWeight: 900, border: "3px solid #1A1A1A", cursor: "pointer", boxShadow: "3px 3px 0px #1A1A1A" }}
                        >
                          🔍 Ver
                        </button>
                        <button 
                          onClick={() => handleDownload(archivoPath, `${nombreEjercicio}`)}
                          style={{ flex: 2, borderRadius: "14px", padding: "10px", fontWeight: 900, fontSize: "1rem", backgroundColor: "var(--color-secondary)", border: "3px solid #1A1A1A", color: "white", boxShadow: "3px 3px 0px #0369A1", cursor: "pointer" }}
                        >
                          📥 Bajar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Modal de Previsualización Mejorado */}
        {preview && (
          <div style={{ 
            position: "fixed", 
            inset: 0, 
            backgroundColor: "rgba(26, 26, 26, 0.85)", 
            zIndex: 1000, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            padding: "clamp(0.5rem, 4vw, 2rem)",
            backdropFilter: "blur(5px)"
          }} onClick={() => setPreview(null)}>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              maxWidth: "900px", 
              height: "90vh", 
              maxHeight: "1200px",
              backgroundColor: "white", 
              borderRadius: "30px", 
              overflow: "hidden", 
              display: "flex", 
              flexDirection: "column", 
              border: "var(--border-thick)", 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
            }} onClick={e => e.stopPropagation()}>
               <div style={{ padding: "1rem 1.5rem", borderBottom: "var(--border-thick)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC" }}>
                 <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                   ✨ Ver Cuaderno
                 </h3>
                 <button 
                  onClick={() => setPreview(null)}
                  style={{ 
                    background: "var(--color-accent)", 
                    border: "var(--border-thick)", 
                    borderRadius: "12px", 
                    width: "44px", 
                    height: "44px", 
                    cursor: "pointer", 
                    fontWeight: "900", 
                    color: "white", 
                    fontSize: "1.2rem", 
                    boxShadow: "4px 4px 0px #7f1d1d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>✕</button>
               </div>
               <div style={{ flex: 1, position: "relative" }}>
                 <iframe 
                  src={`${preview}#toolbar=0`} 
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="Preview Cuaderno"
                 />
               </div>
               <div style={{ padding: "1.2rem", borderTop: "2px solid #E2E8F0", textAlign: "center" }}>
                 <button 
                   onClick={() => handleDownload(preview, 'cuaderno')}
                   className="btn-primary" 
                   style={{ width: "220px", borderRadius: "50px", backgroundColor: "var(--color-secondary)", boxShadow: "0 5px 0 #0369A1" }}
                 >
                   📥 Descargar PDF
                 </button>
               </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div style={{ 
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem"
        }}>
          <div style={{ 
            width: "100%",
            maxWidth: "600px",
            padding: "2.5rem", 
            backgroundColor: "#F0FDFA", 
            borderRadius: "40px", 
            textAlign: "center",
            border: "4px dashed #2DD4BF",
            boxShadow: "10px 10px 0 #ccfbf1"
          }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "#0D9488", fontWeight: 800 }}>¿Quieres tus propias frases?</h2>
            <p style={{ color: "#0F766E", fontSize: "1.1rem", fontWeight: 600 }}>¡Usa el Generador para escribir lo que tú quieras!</p>
            <Link href="/generador" style={{ 
              marginTop: "1.5rem", 
              width: "100%", 
              padding: "15px", 
              borderRadius: "50px", 
              backgroundColor: "#0D9488", 
              boxShadow: "0 6px 0px #0F766E",
              color: "white",
              display: "block",
              fontWeight: 800,
              fontSize: "1.2rem"
            }}>
              🪄 Abrir Generador Caligráfico
            </Link>
          </div>

          <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "1.1rem", borderBottom: "3px solid var(--color-secondary)", paddingBottom: "2px" }}>
            🏠 Volver al Inicio
          </Link>
        </div>

      </div>
    </main>
  );
}
