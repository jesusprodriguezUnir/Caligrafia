"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "../caligrafiate/caligrafiate.module.css";

export default function GeneradorMagico() {
  const [texto, setTexto] = useState("¡Mi magia!");
  const [fontSize, setFontSize] = useState(80);
  const [color, setColor] = useState("#0EA5E9");
  const [showGuides, setShowGuides] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar líneas guía (pauta)
    if (showGuides) {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(20, i);
        ctx.lineTo(canvas.width - 20, i);
        ctx.stroke();
      }
      
      // Margen
      ctx.strokeStyle = "#ffb3b3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 0);
      ctx.lineTo(60, canvas.height);
      ctx.stroke();
    }

    // Estilo de caligrafía
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${fontSize}px var(--font-main)`;

    // Dibujar texto
    const words = texto || "Escribe algo";
    ctx.fillText(words, canvas.width / 2, canvas.height / 2);
    
    // Marca de agua
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.font = "bold 14px Arial";
    ctx.fillText("Caligra-Fiate", canvas.width - 70, canvas.height - 20);

    // Borde de la hoja
    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  }, [texto, fontSize, color, showGuides]);

  const descargarImagen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `caligrafia-personalizada.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <main className={styles.main}>
      <header style={{ textAlign: "center", marginBottom: "3rem", paddingTop: "2.5rem" }}>
         <h1 className={styles.brand}>GENERADOR <span className={styles.brandUnder}>MÁGICO</span></h1>
         <p className={styles.tagline}>Crea tus propios ejercicios de escritura en segundos ✨</p>
      </header>

      <div style={{ display: "flex", gap: "2rem", width: "100%", maxWidth: "1200px", flexWrap: "wrap", justifyContent: "center" }}>
        
        {/* Panel de Controles */}
        <div style={{ 
          flex: "1 1 400px", 
          background: "white", 
          padding: "2.5rem", 
          borderRadius: "var(--radius-lg)", 
          border: "var(--border-thick)", 
          boxShadow: "var(--shadow-flat)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <div>
            <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>✍️ Texto a practicar:</label>
            <input 
              type="text" 
              value={texto} 
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ej: Hola me llamo..." 
              maxLength={40}
              style={{ 
                width: "100%", 
                padding: "1rem", 
                borderRadius: "15px", 
                border: "3px solid #1A1A1A",
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "inset 3px 3px 0 rgba(0,0,0,0.05)"
              }} 
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>📏 Tamaño:</label>
              <input 
                type="range" 
                min="40" 
                max="120" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--color-secondary)" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>🎨 Color:</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["#1A1A1A", "#0EA5E9", "#EF4444", "#22C55E", "#FB923C"].map(c => (
                  <button 
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ 
                      width: "30px", 
                      height: "30px", 
                      borderRadius: "50%", 
                      background: c, 
                      border: color === c ? "3px solid #1A1A1A" : "1px solid #ddd",
                      cursor: "pointer",
                      transform: color === c ? "scale(1.2)" : "none"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, cursor: "pointer" }}>
            <input type="checkbox" checked={showGuides} onChange={e => setShowGuides(e.target.checked)} style={{ width: "20px", height: "20px" }} />
            Mostrar guías y pauta
          </label>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <button onClick={() => setTexto("Mamá")} style={{ padding: "8px 15px", border: "2px solid #ddd", borderRadius: "10px", background: "white", cursor: "pointer", fontWeight: 700 }}>Mamá</button>
            <button onClick={() => setTexto("Papá")} style={{ padding: "8px 15px", border: "2px solid #ddd", borderRadius: "10px", background: "white", cursor: "pointer", fontWeight: 700 }}>Papá</button>
            <button onClick={() => setTexto("El sol brilla")} style={{ padding: "8px 15px", border: "2px solid #ddd", borderRadius: "10px", background: "white", cursor: "pointer", fontWeight: 700 }}>Frase</button>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={descargarImagen} className="btn-primary" style={{ width: "100%", padding: "18px", fontSize: "1.2rem", backgroundColor: "var(--color-cta)", boxShadow: "5px 5px 0 #1A1A1A" }}>
              🖼️ Descargar PNG
            </button>
          </div>
          
          <Link href="/" style={{ textAlign: "center", color: "#64748b", fontWeight: 700 }}>
            ← Volver al inicio
          </Link>
        </div>

        {/* Preview Canvas */}
        <div style={{ flex: "1 1 600px", minWidth: 0 }}>
          <div style={{ 
            background: "white", 
            padding: "1rem", 
            borderRadius: "var(--radius-lg)", 
            border: "var(--border-thick)", 
            boxShadow: "var(--shadow-flat)",
            position: "sticky",
            top: "2rem"
          }}>
            <h3 style={{ fontFamily: "var(--font-hand)", fontSize: "1.8rem", textAlign: "center", marginBottom: "1rem" }}>¡Tu ficha en vivo!</h3>
            <div style={{ border: "2px dashed #E2E8F0", borderRadius: "15px", overflow: "hidden" }}>
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={500} 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
            <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#94a3b8", marginTop: "1rem" }}>
              Revisa que las letras quepan bien en el papel antes de bajarlo.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
