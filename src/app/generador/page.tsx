"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";

export default function GeneradorMagico() {
  const [texto, setTexto] = useState("Hola Mundo");
  const [fase, setFase] = useState("fase1");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generarRecurso();
  }, [texto, fase]);

  const generarRecurso = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar líneas guía (pauta)
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Estilo de caligrafía
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Ajustar tamaño según longitud
    const fontSize = texto.length > 10 ? 60 : 100;
    ctx.font = `${fontSize}px Fredoka`;

    // Simular línea de puntos (dotted) para trazado
    const textToDraw = texto || "Escribe algo";
    ctx.fillText(textToDraw, canvas.width / 2, canvas.height / 2);
    
    // Dibujar los bordes de la "hoja"
    ctx.strokeStyle = "var(--color-primary)";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  };

  const descargarImagen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `recurso-caligrafia-${texto}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.hero} glass`} style={{ maxWidth: "900px" }}>
        <h1 className={styles.title}>Generador de Recursos Mágicos</h1>
        <p className={styles.subtitle}>Escribe lo que quieras y crea un ejercicio de caligrafía a medida.</p>

        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1.5rem", 
          background: "white", 
          padding: "2rem", 
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-md)",
          textAlign: "left"
        }}>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>Texto a practicar:</label>
            <input 
              type="text" 
              value={texto} 
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ej: Mi mamá me mima" 
              style={{ 
                width: "100%", 
                padding: "1rem", 
                borderRadius: "var(--radius-sm)", 
                border: "2px solid #ddd",
                fontSize: "1.2rem",
                fontFamily: "inherit"
              }} 
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => setTexto("Mamá")} className={styles.btnSecondary} style={{ fontSize: "0.9rem" }}>Sugerir: Mamá</button>
            <button onClick={() => setTexto("Papá")} className={styles.btnSecondary} style={{ fontSize: "0.9rem" }}>Sugerir: Papá</button>
            <button onClick={() => setTexto("Me gusta jugar")} className={styles.btnSecondary} style={{ fontSize: "0.9rem" }}>Sugerir: Frase</button>
          </div>

          <div style={{ border: "4px solid var(--color-accent)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={300} 
              style={{ width: "100%", height: "auto", display: "block" }} 
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={descargarImagen} className="btn-primary" style={{ flex: 2 }}>
              Descargar Recurso (PNG)
            </button>
            <Link href="/cuadernillos" className={styles.btnSecondary} style={{ flex: 1 }}>
              Volver
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
