"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { PDFDocument } from 'pdf-lib';
import styles from "../caligrafiate/caligrafiate.module.css";
import { Header } from "@/components/Header";
import { DownloadIcon, SparklesIcon } from "@/components/Icons";
import { useTheme } from "@/contexts/ThemeContext";
import { drawLineasGuia, getMarginX, MARGEN_ICONS } from "@/lib/helpers/canvas-helpers";
import type { Formato, Margen, MargenDibujo } from "@/lib/helpers/types";

type TipoLetra = "escolar" | "escolar-dot" | "massallera" | "massallera-dot" | "mestra-pauta" | "mestra-pauta-dot" | "mestra-montessori" | "mestra-montessori-dot";

const bancoPalabras = [
  "Lucía", "Martín", "Noemí", "Carlos", "Sofía", "Diego", "María", "Pablo", "Ana", "Javier",
  "perro", "gato", "león", "elefante", "mariposa", "caballo", "pájaro", "pez", "rana", "vaca",
  "rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "negro", "blanco", "marrón",
  "casa", "libro", "sol", "luna", "estrella", "árbol", "flor", "coche", "avión", "barco",
  "Hola", "Adiós", "Gracias", "Por favor", "Buenos días", "Buenas noches", "Amigo", "Familia"
];

const bancoFrases = [
  "El sol brilla",
  "Mi familia es grande",
  "Me gusta leer",
  "Hoy es un gran día",
  "Juego con mis amigos",
  "El cielo está azul",
  "Tengo un perro",
  "Me encanta la pizza",
  "Voy al parque",
  "Mi casa es grande",
  "El tren es rápido",
  "Las estrellas brillan",
  "El agua es azul",
  "Tengo muchos amigos",
  "Me divierto mucho"
];

const plantillas = {
  vocales: ["A", "E", "I", "O", "U", "", "", ""],
  alfabeto: ["A", "B", "C", "D", "E", "F", "G", "H"],
  numeros: ["1", "2", "3", "4", "5", "6", "7", "8"],
  dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", ""]
};

export default function GeneradorMagico() {
  const { theme } = useTheme();
  const [lineas, setLineas] = useState<string[]>(["¡Mi magia!", "", "", ""]);
  const [debouncedLineas, setDebouncedLineas] = useState<string[]>(["¡Mi magia!", "", "", ""]);
  const [numLineas, setNumLineas] = useState(4);
  const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#0EA5E9");
  const [showGuides, setShowGuides] = useState(true);
  const [tipoLetra, setTipoLetra] = useState<TipoLetra>("escolar");
  const [margen, setMargen] = useState<Margen>("con");
  const [margenDibujo, setMargenDibujo] = useState<MargenDibujo>("tren");
  const [formato, setFormato] = useState<Formato>("pauta-normal");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const actualizarLinea = (index: number, valor: string) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index] = valor;
    setLineas(nuevasLineas);
  };

  useEffect(() => {
    if (lineas.length !== numLineas) {
      const nuevasLineas = [...lineas];
      while (nuevasLineas.length < numLineas) {
        nuevasLineas.push("");
      }
      while (nuevasLineas.length > numLineas) {
        nuevasLineas.pop();
      }
      setLineas(nuevasLineas);
    }
  }, [numLineas, lineas]);

  // Debounce lineas state for canvas rendering (150ms delay)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedLineas(lineas);
    }, 150);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lineas]);

  const getFontFamily = () => {
    switch (tipoLetra) {
      case "massallera":
      case "massallera-dot":
        return "Massallera, Georgia";
      case "escolar":
      case "escolar-dot":
        return "Escolar, Georgia";
      case "mestra-pauta":
      case "mestra-pauta-dot":
        return "Mestra Pauta, Georgia";
      case "mestra-montessori":
      case "mestra-montessori-dot":
        return "Mestra Montessori, Georgia";
      default:
        return "Escolar, Georgia";
    }
  };

  const generarAleatorio = () => {
    const nuevasLineas: string[] = [];
    const numFrases = Math.min(numLineas, 10);
    
    for (let i = 0; i < numFrases; i++) {
      const usarFrase = Math.random() > 0.4;
      if (usarFrase) {
        const frase = bancoFrases[Math.floor(Math.random() * bancoFrases.length)];
        nuevasLineas.push(frase);
      } else {
        const palabra = bancoPalabras[Math.floor(Math.random() * bancoPalabras.length)];
        nuevasLineas.push(palabra);
      }
    }
    
    while (nuevasLineas.length < numLineas) {
      nuevasLineas.push("");
    }
    
    setLineas(nuevasLineas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const margenWidth = getMarginX(margen);

    if (showGuides) {
      drawLineasGuia(ctx, formato, margen, margenDibujo, canvas.width, canvas.height);

      // Draw pink margin line (generador-specific feature)
      ctx.strokeStyle = "#ffb3b3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margenWidth, 0);
      ctx.lineTo(margenWidth, canvas.height);
      ctx.stroke();
    } else {
      // Still need to draw white canvas if not showing guides
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const isDot = tipoLetra === "escolar-dot" || tipoLetra === "massallera-dot";
    const isCuadricula = formato === "cuadricula-4" || formato === "cuadricula-5";

    if (isCuadricula) {
      // === GRID MODE: auto-fit text to grid structure ===
      const cellSize = formato === "cuadricula-4" ? 16 : 20;
      const majorStep = cellSize * 5; // heavy line every 5 cells (80px or 100px)

      // Calculate how many grid rows the user's fontSize maps to.
      // We use the fontSize slider as a *proportion* control: 
      //   slider min(20) → text occupies 2 major rows  (small)
      //   slider mid(60)  → text occupies 4 major rows  (normal)
      //   slider max(100) → text occupies 5 major rows  (large)
      const rowsForText = Math.max(2, Math.round(fontSize / 20));
      const effectiveFontSize = Math.round(cellSize * rowsForText * 0.75); // 75% of band height for nice baseline fit
      const bandHeight = cellSize * rowsForText; // px height each text line occupies
      const gapRows = Math.max(1, Math.round(rowsForText * 0.4)); // gap between text bands
      const totalLineStep = bandHeight + cellSize * gapRows;

      // Start text at the first major gridline after top padding
      const gridStartY = 20; // where grid starts
      const firstMajorAfterTop = gridStartY + majorStep;
      
      const textStartX = margenWidth + cellSize; // one cell of padding from margin
      
      debouncedLineas.forEach((texto, index) => {
        if (!texto) return;

        // Each text line sits within its own band
        const bandTopY = firstMajorAfterTop + index * totalLineStep;
        // Baseline sits at ~75% of the band (so the text "sits" on a grid line)
        const baselineY = bandTopY + Math.round(bandHeight * 0.78);

        // Skip if this band would go below the canvas
        if (bandTopY + bandHeight > canvas.height - 30) return;

        // Draw a subtle highlight band behind the text
        ctx.fillStyle = "rgba(255, 243, 224, 0.35)";
        ctx.fillRect(margenWidth, bandTopY, canvas.width - margenWidth - 20, bandHeight);

        // Render the text
        ctx.fillStyle = color;
        ctx.font = `bold ${effectiveFontSize}px ${getFontFamily()}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";

        if (isDot) {
          drawDottedTextLeft(ctx, texto, textStartX, baselineY, effectiveFontSize, color, margenWidth);
        } else {
          ctx.fillText(texto, textStartX, baselineY);
        }
      });
    } else {
      // === PAUTA MODES (Montessori / Normal): existing centered logic ===
      const lineSpacing = 60;
      const startY = 75;
      const textStartX = margenWidth + 10;

      // For pauta modes, use 'middle' baseline and place text between guide lines
      ctx.textBaseline = "middle";

      // Calculate the actual Y positions of the guide rows
      const h = 22;
      const gap = 30;
      const rowPositions: number[] = [];
      let lineY = 100;
      while (lineY + h * 3 < canvas.height - 50) {
        const midTop = lineY + h;
        const midBot = lineY + h * 2;
        rowPositions.push(midTop + (midBot - midTop) / 2); // center between the two guide lines
        lineY += h * 3 + gap;
      }

      debouncedLineas.forEach((texto, index) => {
        if (!texto) return;

        // Use the actual guide row position if available, otherwise fall back to linear
        const y = index < rowPositions.length ? rowPositions[index] : startY + index * lineSpacing;

        ctx.font = `bold ${fontSize}px ${getFontFamily()}`;
        ctx.textAlign = "center";
        const textMetrics = ctx.measureText(texto);
        const textWidth = textMetrics.width;
        const canvasRight = canvas.width - 20;
        const availableWidth = canvasRight - margenWidth;
        const maxCenter = margenWidth + availableWidth / 2;
        const minCenter = margenWidth + textWidth / 2 + 10;
        const centerX = Math.min(maxCenter, Math.max(minCenter, (margenWidth + canvasRight) / 2));

        if (isDot) {
          drawDottedText(ctx, texto, centerX, y, fontSize, color, margenWidth);
        } else {
          ctx.fillText(texto, centerX, y);
        }
      });
    }

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.font = "bold 14px Arial";
    ctx.fillText("Caligra-Fiate", canvas.width - 70, canvas.height - 20);

    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  }, [debouncedLineas, fontSize, color, showGuides, tipoLetra, margen, margenDibujo, formato]);

  const drawDottedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, color: string, margenWidth: number) => {
    const isEscolarDot = tipoLetra === "escolar-dot";
    const isMassalleraDot = tipoLetra === "massallera-dot";
    const canvasRight = ctx.canvas.width - 20;
    const availableWidth = canvasRight - margenWidth;
    const maxCenter = margenWidth + availableWidth / 2;
    
    if (isEscolarDot) {
      ctx.font = `${fontSize}px "Escolar Dot", "Escolar", Arial`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const minCenter = margenWidth + textWidth / 2 + 10;
      const centerX = Math.min(maxCenter, Math.max(minCenter, (margenWidth + canvasRight) / 2));
      const startX = centerX - textWidth / 2;
      ctx.fillStyle = color;
      ctx.fillText(text, startX, y);
    } else if (isMassalleraDot) {
      ctx.font = `bold ${fontSize}px "Massallera", Georgia`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const minCenter = margenWidth + textWidth / 2 + 10;
      const centerX = Math.min(maxCenter, Math.max(minCenter, (margenWidth + canvasRight) / 2));
      const startX = centerX - textWidth / 2;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1, fontSize * 0.025);
      ctx.setLineDash([1.5, 3.5]);
      ctx.strokeText(text, startX, y);
      ctx.setLineDash([]);
    }
  };

  const drawDottedTextLeft = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, color: string, margenWidth: number) => {
    const isEscolarDot = tipoLetra === "escolar-dot";
    const isMassalleraDot = tipoLetra === "massallera-dot";
    
    if (isEscolarDot) {
      ctx.font = `${fontSize}px "Escolar Dot", "Escolar", Arial`;
    } else if (isMassalleraDot) {
      ctx.font = `bold ${fontSize}px "Massallera", Georgia`;
    }
    
    ctx.textAlign = "left";
    if (isEscolarDot) {
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    } else if (isMassalleraDot) {
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1, fontSize * 0.025);
      ctx.setLineDash([1.5, 3.5]);
      ctx.strokeText(text, x, y);
      ctx.setLineDash([]);
    }
  };

  const descargarImagen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `caligrafia-personalizada.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const descargarPDF = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const imgData = canvas.toDataURL('image/png');
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([794, 1123]); // A4 dimensions
      const image = await pdfDoc.embedPng(imgData);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: 794,
        height: 1123,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.download = `caligrafia-personalizada.pdf`;
      link.href = URL.createObjectURL(blob);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const isTinta = theme === "tinta";
  const isStudio = theme === "studio";
  const panelBorder = isTinta ? "1px solid #D4C9B5" : "var(--border-thick)";
  const panelShadow = isTinta
    ? "0 18px 40px rgba(27,43,75,0.12)"
    : isStudio
      ? "0 18px 40px rgba(15,23,42,0.10)"
      : "var(--shadow-flat)";
  const panelBackground = isTinta
    ? "linear-gradient(180deg, #FFFDF8 0%, #F7F1E7 100%)"
    : isStudio
      ? "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)"
      : "white";
  const previewFrameBackground = isTinta ? "#FBF7F0" : isStudio ? "#F8FAFC" : "#F8FAFC";
  const previewInnerShadow = isTinta
    ? "0 18px 36px rgba(27,43,75,0.10), 0 2px 6px rgba(27,43,75,0.08)"
    : isStudio
      ? "0 20px 40px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)"
      : "0 10px 30px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)";
  const sectionLabelStyle = {
    fontWeight: 800,
    display: "block",
    marginBottom: "0.75rem",
    fontSize: "1rem",
    color: "var(--color-primary)",
  } as const;
  const inputSurfaceStyle = {
    width: "100%",
    padding: "1rem",
    borderRadius: "var(--radius-md)",
    border: panelBorder,
    fontSize: "1rem",
    fontWeight: 700,
    outline: "none",
    background: isTinta ? "#FFFDF8" : "white",
    color: "var(--color-primary)",
    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
  } as const;
  const buttonShadow = isTinta ? "0 10px 22px rgba(193,68,14,0.18)" : isStudio ? "0 14px 24px rgba(13,148,136,0.16)" : "var(--shadow-flat)";
  const mutedButtonShadow = isTinta ? "0 10px 20px rgba(27,43,75,0.12)" : isStudio ? "0 12px 24px rgba(15,23,42,0.10)" : "var(--shadow-md)";
  const introEyebrow = isTinta ? "TALLER DE CALIGRAFÍA" : isStudio ? "ESTUDIO DE COMPOSICIÓN" : "LABORATORIO CREATIVO";
  const introTitle = isTinta ? "Diseña tu hoja como un copista" : isStudio ? "Generador libre de fichas" : "Generador mágico en tiempo real";
  const introCopy = isTinta
    ? "Ajusta fuente, pauta y márgenes con una interfaz más sobria, pensada para preparar cuadernos listos para imprimir."
    : isStudio
      ? "Configura el ejercicio, revisa el lienzo y exporta un PDF limpio desde un panel claro y rápido."
      : "Escribe, mezcla plantillas y descarga tus fichas con un flujo lúdico y directo.";
  const panelTitle = isTinta ? "Mesa del copista" : isStudio ? "Ajustes del estudio" : "Ajustes del Estudio";
  const previewTitle = isTinta ? "Hoja en composición" : isStudio ? "Preview de impresión" : "Tu Obra Maestra ✨";
  const previewBadge = isTinta ? "LISTO PARA AULA" : isStudio ? "PDF READY" : "CALIDAD HD";
  const tipBackground = isTinta ? "#FFF7ED" : isStudio ? "#F0FDFA" : "#FFF7ED";
  const tipBorder = isTinta ? "1px solid #FED7AA" : isStudio ? "1px solid #99F6E4" : "1px solid #FFEDD5";
  const tipTextColor = isTinta ? "#9A3412" : isStudio ? "#0F766E" : "#92400E";
  const ctaPanelBackground = isTinta
    ? "linear-gradient(135deg, #FFF7ED 0%, #FDF2F8 100%)"
    : isStudio
      ? "linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)"
      : "linear-gradient(135deg, #F0F9FF 0%, #F0FDF4 100%)";
  const ctaPanelBorder = isTinta ? "1px solid #FDBA74" : isStudio ? "1px solid #99F6E4" : "2px solid #0EA5E9";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--color-background)", fontFamily: "var(--font-main)" }}>
      <Header />
      
      <main style={{ 
        flex: 1, 
        background: "var(--color-background)",
        padding: "clamp(1rem, 3vw, 2rem)"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <section style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "1.5rem",
            alignItems: "stretch",
          }} className="generador-hero-grid">
            <div style={{
              background: panelBackground,
              border: panelBorder,
              borderRadius: "var(--radius-lg)",
              boxShadow: panelShadow,
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.25rem",
            }}>
              <div>
                <p style={{
                  fontSize: isTinta ? "0.9rem" : "0.78rem",
                  fontWeight: 800,
                  color: isTinta ? "var(--color-cta)" : "var(--color-secondary)",
                  textTransform: "uppercase" as const,
                  letterSpacing: isTinta ? "1.2px" : "1.6px",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: isTinta ? "var(--color-cta)" : "var(--color-secondary)", display: "inline-block" }} />
                  {introEyebrow}
                </p>
                <h1 style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: isTinta ? "italic" : "normal",
                  fontWeight: isTinta ? 700 : isStudio ? 700 : 900,
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  color: "var(--color-primary)",
                  marginBottom: "1rem",
                }}>
                  {introTitle}
                </h1>
                <p style={{ color: "#475569", fontSize: "1.02rem", lineHeight: 1.75, maxWidth: 640 }}>
                  {introCopy}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["8 fuentes educativas", "Exportación PNG y PDF", "Vista previa instantánea"].map((item) => (
                  <span key={item} style={{
                    padding: "0.7rem 1rem",
                    borderRadius: isTinta ? "999px" : "var(--radius-md)",
                    background: isTinta ? "rgba(255,255,255,0.72)" : "white",
                    border: panelBorder,
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              background: isTinta ? "#FCF8F1" : isStudio ? "#FFFFFF" : "white",
              border: panelBorder,
              borderRadius: "var(--radius-lg)",
              boxShadow: panelShadow,
              padding: "clamp(1.25rem, 2vw, 1.75rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontWeight: 800, color: "var(--color-primary)", fontSize: "1rem", marginBottom: "0.35rem" }}>Resumen del ejercicio</p>
                  <p style={{ color: "#64748b", fontSize: "0.92rem" }}>Configura texto, pauta, margen y tipografía desde un solo panel.</p>
                </div>
                <div style={{
                  padding: "0.75rem 1rem",
                  borderRadius: isTinta ? "999px" : "var(--radius-md)",
                  background: isTinta ? "#FFF7ED" : isStudio ? "#F0FDFA" : "#EDE9FE",
                  color: isTinta ? "#9A3412" : isStudio ? "#0F766E" : "#6B21A8",
                  fontWeight: 800,
                  fontSize: "0.84rem",
                }}>
                  {numLineas} líneas · {fontSize}px · {formato}
                </div>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.9rem",
              }}>
                {[
                  { label: "Fuente", value: tipoLetra },
                  { label: "Margen", value: margen === "sin" ? "sin" : margen === "con" ? "línea" : margenDibujo },
                  { label: "Guías", value: showGuides ? "activas" : "ocultas" },
                  { label: "Color", value: color.toUpperCase() },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    background: previewFrameBackground,
                    border: panelBorder,
                  }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.5px", color: "#64748b", textTransform: "uppercase" as const, marginBottom: "0.45rem" }}>{item.label}</p>
                    <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-primary)" }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <Link href="/caligrafiate" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                alignSelf: "flex-start",
                padding: "0.9rem 1.2rem",
                borderRadius: isTinta ? "999px" : "var(--radius-md)",
                background: "var(--color-cta)",
                color: "white",
                border: "var(--border-thick)",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: buttonShadow,
              }}>
                <SparklesIcon /> Abrir asistente guiado
              </Link>
            </div>
          </section>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(340px, 520px) minmax(0, 1fr)", gap: "1.5rem", alignItems: "start" }} className="generador-layout-grid">
        {/* SIDEBAR DE CONTROLES */}
        <aside 
          style={{ 
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "sticky",
            top: "5.75rem",
          }}
        >
          <div style={{ 
            background: panelBackground,
            padding: "2rem", 
            borderRadius: "var(--radius-lg)", 
            border: panelBorder,
            boxShadow: panelShadow,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <div>
              <p style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1.4px", color: isTinta ? "var(--color-cta)" : "var(--color-secondary)", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Panel de control</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontStyle: isTinta ? "italic" : "normal", fontSize: "2.2rem", color: "var(--color-primary)", marginBottom: "0.35rem" }}>
                {panelTitle}
              </h2>
              <p style={{ color: "#64748b", lineHeight: 1.65, fontSize: "0.96rem" }}>Modifica el ejercicio y observa el resultado al instante en el lienzo de la derecha.</p>
            </div>

            <section>
              <label style={{ fontWeight: 800, display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "1.2rem" }}>
                <span>✍️ Texto Mágico</span>
                <span style={{ fontSize: "0.9rem", color: "#64748b" }}>{numLineas} líneas</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={numLineas} 
                onChange={(e) => setNumLineas(parseInt(e.target.value))}
                style={{ width: "100%", height: "8px", accentColor: "var(--color-secondary)", marginBottom: "1.5rem" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "350px", overflowY: "auto", paddingRight: "8px" }}>
                {lineas.map((linea, index) => (
                  <input 
                    key={index}
                    type="text" 
                    value={linea}
                    onChange={(e) => actualizarLinea(index, e.target.value)}
                    placeholder={`Escribe algo aquí...`}
                    maxLength={40}
                    style={inputSurfaceStyle}
                  />
                ))}
              </div>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={sectionLabelStyle}>📏 Tamaño</label>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  style={{ width: "100%", height: "8px", accentColor: "var(--color-secondary)" }}
                />
              </div>
              <div>
                <label style={sectionLabelStyle}>🎨 Color</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["#1A1A1A", "#0EA5E9", "#EF4444", "#22C55E", "#FB923C"].map(c => (
                    <button 
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ 
                        width: "32px", 
                        height: "32px", 
                        borderRadius: "50%", 
                        background: c, 
                        border: color === c ? "3px solid var(--color-primary)" : "1px solid #cbd5e1",
                        cursor: "pointer",
                        transform: color === c ? "scale(1.15)" : "none",
                        transition: "transform 0.2s"
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section>
              <label style={sectionLabelStyle}>🔤 Estilo de Letra</label>
              <select
                value={tipoLetra}
                onChange={(e) => setTipoLetra(e.target.value as TipoLetra)}
                style={{ ...inputSurfaceStyle, fontWeight: 800, cursor: "pointer" }}
              >
                <option value="escolar">Escolar Normal</option>
                <option value="escolar-dot">Escolar Punteada</option>
                <option value="massallera">Massallera Normal</option>
                <option value="massallera-dot">Massallera Punteada</option>
                <option value="mestra-pauta">Mestra Pauta Normal</option>
                <option value="mestra-pauta-dot">Mestra Pauta Punteada</option>
                <option value="mestra-montessori">Mestra Montessori Normal</option>
                <option value="mestra-montessori-dot">Mestra Montessori Punteada</option>
              </select>
            </section>

            <section>
              <label style={sectionLabelStyle}>📐 Formato de Pauta</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { val: "pauta-guiada" as Formato, label: "Montessori" },
                  { val: "pauta-normal" as Formato, label: "Normal" },
                  { val: "cuadricula-5" as Formato, label: "Cuadrícula" },
                  { val: "cuadricula-4" as Formato, label: "4mm" }
                ].map((f) => (
                  <button 
                    key={f.val}
                    onClick={() => setFormato(f.val)}
                    style={{ 
                      padding: "12px", 
                      borderRadius: "var(--radius-md)", 
                      border: formato === f.val ? "var(--border-thick)" : panelBorder,
                      background: formato === f.val ? "var(--color-secondary)" : previewFrameBackground,
                      color: formato === f.val ? "white" : "#475569",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      boxShadow: formato === f.val ? mutedButtonShadow : "none",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label style={sectionLabelStyle}>🖼️ Dibujo de Margen</label>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                {(["sin", "con", "dibujo"] as Margen[]).map((m) => (
                  <button 
                    key={m}
                    onClick={() => setMargen(m)}
                    style={{ 
                      flex: 1,
                      padding: "12px", 
                      borderRadius: "var(--radius-md)", 
                      border: margen === m ? "var(--border-thick)" : panelBorder,
                      background: margen === m ? "var(--color-cta)" : isTinta ? "#FFFDF8" : "white",
                      color: margen === m ? "white" : "#1A1A1A",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      boxShadow: margen === m ? buttonShadow : "none",
                    }}
                  >
                    {m === "sin" ? "Sin" : m === "con" ? "Línea" : "Emoji"}
                  </button>
                ))}
              </div>
              {margen === "dibujo" && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", background: previewFrameBackground, padding: "15px", borderRadius: "var(--radius-md)", border: panelBorder }}>
                  {(Object.keys(MARGEN_ICONS) as MargenDibujo[]).map((img) => (
                    <button
                      key={img}
                      onClick={() => setMargenDibujo(img)}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "var(--radius-sm)",
                        border: margenDibujo === img ? "var(--border-thick)" : "1px solid transparent",
                        background: "white",
                        cursor: "pointer",
                        fontSize: "1.4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.1s",
                        boxShadow: margenDibujo === img ? mutedButtonShadow : "none",
                      }}
                    >
                      {MARGEN_ICONS[img]}
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section style={{ marginTop: "1rem" }}>
              <label style={sectionLabelStyle}>⚡ Plantillas rápidas</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <button
                  onClick={() => setLineas(plantillas.vocales)}
                  style={{
                    padding: "12px",
                    border: panelBorder,
                    borderRadius: "var(--radius-md)",
                    background: isTinta ? "#FFFDF8" : "white",
                    color: "#1A1A1A",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f9ff"; e.currentTarget.style.borderColor = "var(--color-secondary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#ddd"; }}
                >
                  Vocales
                </button>
                <button
                  onClick={() => setLineas(plantillas.alfabeto)}
                  style={{
                    padding: "12px",
                    border: panelBorder,
                    borderRadius: "var(--radius-md)",
                    background: isTinta ? "#FFFDF8" : "white",
                    color: "#1A1A1A",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.borderColor = "var(--color-success)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#ddd"; }}
                >
                  Alfabeto
                </button>
                <button
                  onClick={() => setLineas(plantillas.numeros)}
                  style={{
                    padding: "12px",
                    border: panelBorder,
                    borderRadius: "var(--radius-md)",
                    background: isTinta ? "#FFFDF8" : "white",
                    color: "#1A1A1A",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fff7ed"; e.currentTarget.style.borderColor = "var(--color-cta)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#ddd"; }}
                >
                  Números
                </button>
                <button
                  onClick={() => setLineas(plantillas.dias)}
                  style={{
                    padding: "12px",
                    border: panelBorder,
                    borderRadius: "var(--radius-md)",
                    background: isTinta ? "#FFFDF8" : "white",
                    color: "#1A1A1A",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fce7f3"; e.currentTarget.style.borderColor = "#ec4899"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#ddd"; }}
                >
                  Días
                </button>
              </div>
            </section>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={generarAleatorio} style={{
                  flex: 1,
                  padding: "16px",
                  border: "var(--border-thick)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-success)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 900,
                  boxShadow: mutedButtonShadow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "1rem"
                }}>
                  🎲 Aleatorio
                </button>
                <button
                  onClick={descargarImagen}
                  style={{
                    flex: 1.5,
                    padding: "16px",
                    border: "var(--border-thick)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-cta)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 900,
                    boxShadow: buttonShadow,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "1rem"
                  }}
                >
                  <DownloadIcon /> PNG
                </button>
              </div>
              <button
                onClick={descargarPDF}
                style={{
                  padding: "16px",
                  border: "var(--border-thick)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-cta)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 900,
                  boxShadow: buttonShadow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                  transition: "transform 0.1s ease, box-shadow 0.1s ease"
                }}
              >
                <DownloadIcon /> Descargar PDF
              </button>
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL: PREVIEW DE LA FICHA */}
        <section style={{ 
          padding: 0,
          display: "flex", 
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ 
            width: "100%", 
            maxWidth: "900px",
            background: panelBackground,
            padding: "2rem", 
            borderRadius: "var(--radius-lg)", 
            border: panelBorder,
            boxShadow: panelShadow,
            position: "relative"
          }}>
            <div style={{ 
               display: "flex", 
               justifyContent: "space-between", 
               alignItems: "center", 
               marginBottom: "1.5rem",
               borderBottom: isTinta ? "1px dashed #D4C9B5" : "2px dashed #E2E8F0",
               paddingBottom: "1rem"
            }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontStyle: isTinta ? "italic" : "normal", fontSize: "1.8rem", color: "var(--color-primary)" }}>
                  {previewTitle}
                </h3>
                <p style={{ color: "#64748b", fontWeight: 700, fontSize: "0.9rem" }}>
                  Vista previa en tiempo real
                </p>
              </div>
              <div style={{ 
                background: isTinta ? "var(--color-cta)" : "var(--color-secondary)", 
                color: "white", 
                padding: "8px 16px", 
                borderRadius: isTinta ? "999px" : "50px", 
                fontWeight: 800,
                fontSize: "0.8rem",
                border: panelBorder
              }}>
                {previewBadge}
              </div>
            </div>

            <div style={{ 
              background: previewFrameBackground, 
              borderRadius: "var(--radius-md)", 
              padding: "2rem",
              border: panelBorder,
              display: "flex",
              justifyContent: "center",
              boxShadow: isTinta ? "inset 0 2px 12px rgba(27,43,75,0.04)" : "inset 0 2px 10px rgba(0,0,0,0.05)"
            }}>
              <div style={{ 
                background: "white", 
                boxShadow: previewInnerShadow,
                lineHeight: 0,
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <canvas
                  ref={canvasRef}
                  width={794}
                  height={1123} 
                  style={{ 
                    width: "100%", 
                    maxWidth: "700px", 
                    height: "auto", 
                    display: "block" 
                  }} 
                />
              </div>
            </div>

            <div style={{
              marginTop: "1.5rem",
              textAlign: "center",
              padding: "1rem",
              background: tipBackground,
              borderRadius: "var(--radius-md)",
              border: tipBorder
            }}>
              <p style={{ fontSize: "0.9rem", color: tipTextColor, fontWeight: 700 }}>
                💡 <strong>Consejo:</strong> Si las palabras se salen del margen, intenta reducir el tamaño de letra o usar frases más cortas.
              </p>
            </div>

            <div style={{
              marginTop: "2rem",
              padding: "2rem",
              background: ctaPanelBackground,
              borderRadius: "var(--radius-lg)",
              border: ctaPanelBorder,
              textAlign: "center"
            }}>
              <p style={{ fontSize: "0.95rem", color: "#475569", marginBottom: "1rem", fontWeight: 700 }}>
                ¿Buscas algo más personalizado? Prueba nuestro asistente guiado.
              </p>
              <Link href="/caligrafiate" style={{
                display: "inline-block",
                padding: "12px 28px",
                background: isTinta ? "var(--color-cta)" : "var(--color-secondary)",
                color: "white",
                borderRadius: isTinta ? "999px" : "100px",
                fontWeight: 800,
                textDecoration: "none",
                border: "var(--border-thick)",
                boxShadow: buttonShadow,
                fontSize: "0.95rem",
                transition: "transform 0.1s ease, box-shadow 0.1s ease"
              }}>
                Abrir asistente guiado →
              </Link>
            </div>
          </div>
        </section>

          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) {
            .generador-hero-grid,
            .generador-layout-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .generador-hero-grid {
              gap: 1rem !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
}