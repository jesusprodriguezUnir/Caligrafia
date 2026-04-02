"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";

export default function LienzoMagico() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Example: Draw dotted text to trace
        ctx.font = "120px Fredoka";
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("a b c", canvas.width / 2, canvas.height / 2);
        
        // Settings for drawing
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "var(--color-primary)";
        ctx.lineWidth = 15;
      }
    }
  }, []);

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <main className={styles.main}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: "1000px" }}>
        <h1 className={styles.title} style={{ marginBottom: "1rem" }}>Lienzo Mágico</h1>
        <p className={styles.subtitle} style={{ marginBottom: "1rem" }}>Repasa las letras conectando los puntos.</p>
        
        <div style={{ 
          background: "white", 
          borderRadius: "var(--radius-lg)", 
          boxShadow: "var(--shadow-md)",
          padding: "1rem",
           border: "4px solid var(--color-accent)",
          marginBottom: "2rem",
          display: "inline-block"
        }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            style={{ 
              touchAction: "none", 
              cursor: "crosshair",
              border: "2px dashed #eee",
              borderRadius: "var(--radius-sm)",
              maxWidth: "100%",
              backgroundColor: "#fafafa"
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        <div>
          <Link href="/" className="btn-primary">
            &larr; Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
