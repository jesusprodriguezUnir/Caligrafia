"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./caligrafiate.module.css";

// ──────────────────────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────────────────────

type Formato = "pauta-guiada" | "pauta-normal" | "cuadricula-5" | "cuadricula-4" | null;
type Margen = "sin" | "con" | null;
type TipoLetra = "escolar" | "imprenta" | "punteada" | null;
type ModoContenido = "predefinido" | "libre" | null;
type NumLineas = 8 | 12 | 16;

interface Contenido {
  trazos: boolean;
  vocalesMay: boolean;
  vocalesMin: boolean;
  alfabetoMay: boolean;
  alfabetoMin: boolean;
  silabas: boolean;
  palabras: boolean;
  frases: boolean;
  textos: boolean;
}

interface TextoLibre {
  enunciado: string;
  texto: string;
  pieDePageina: string;
  numLineas: NumLineas;
}

interface Config {
  formato: Formato;
  margen: Margen;
  tipoLetra: TipoLetra;
  modoContenido: ModoContenido;
  contenido: Contenido;
  textoLibre: TextoLibre;
}

// ──────────────────────────────────────────────────────────────────────────────
// CONSTANTES DE CANVAS
// ──────────────────────────────────────────────────────────────────────────────

const W = 794; // A4 @ 96dpi ≈ 794px wide
const H = 1123;
const CONTACT_ROUTE = "/contacto";

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS DE CANVAS
// ──────────────────────────────────────────────────────────────────────────────

function drawLineasGuia(
  ctx: CanvasRenderingContext2D,
  formato: Formato,
  margen: Margen
) {
  const mx = margen === "con" ? 60 : 20;
  const lineStep = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(mx, 20, W - mx - 20, H - 40);

  if (formato === "cuadricula-4" || formato === "cuadricula-5") {
    ctx.strokeStyle = "#D1E8FF";
    ctx.lineWidth = 0.6;
    for (let x = mx; x <= W - 20; x += lineStep) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, H - 20); ctx.stroke();
    }
    for (let y = 20; y <= H - 20; y += lineStep) {
      ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }
    ctx.strokeStyle = "#A3C4E0";
    ctx.lineWidth = 0.8;
    for (let x = mx; x <= W - 20; x += lineStep * 5) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, H - 20); ctx.stroke();
    }
    for (let y = 20; y <= H - 20; y += lineStep * 5) {
      ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }
  } else {
    const altRenglon = formato === "pauta-guiada" ? 60 : 40;
    let y = 80;
    while (y + altRenglon < H - 30) {
      if (formato === "pauta-guiada") {
        ctx.strokeStyle = "#B3D1F7";
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(mx, y - 20); ctx.lineTo(W - 20, y - 20); ctx.stroke();
        ctx.strokeStyle = "#7FB3EB";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(W - 20, y); ctx.stroke();
        ctx.strokeStyle = "#B3D1F7";
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(mx, y + 20); ctx.lineTo(W - 20, y + 20); ctx.stroke();
      } else {
        ctx.strokeStyle = "#7FB3EB";
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(W - 20, y); ctx.stroke();
        ctx.strokeStyle = "#D0E6FF";
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(mx, y - (altRenglon / 2)); ctx.lineTo(W - 20, y - (altRenglon / 2)); ctx.stroke();
      }
      y += altRenglon;
    }
  }

  if (margen === "con") {
    ctx.strokeStyle = "#FF9999";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(mx, 20); ctx.lineTo(mx, H - 20); ctx.stroke();
  }

  ctx.strokeStyle = "#1A1A1A";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, W - 20, H - 20);
}

function contentLabel(contenido: Contenido): string {
  const selected = [];
  if (contenido.trazos) selected.push("Trazos libres");
  if (contenido.vocalesMay) selected.push("Vocales MAYU.");
  if (contenido.vocalesMin) selected.push("Vocales min.");
  if (contenido.alfabetoMay) selected.push("Abecedario MAYU.");
  if (contenido.alfabetoMin) selected.push("Abecedario min.");
  if (contenido.silabas) selected.push("Sílabas");
  if (contenido.palabras) selected.push("Palabras");
  if (contenido.frases) selected.push("Frases");
  if (contenido.textos) selected.push("Textos");
  return selected.length ? selected.join(" · ") : "Sin contenido";
}

function drawContenidoSample(
  ctx: CanvasRenderingContext2D,
  config: Config
) {
  const { contenido, tipoLetra, margen, formato } = config;
  const mx = margen === "con" ? 75 : 30;
  const fontBase = tipoLetra === "escolar" ? "Georgia" : "Arial";

  let y = 100;

  const lineStep =
    formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;
  const altRenglon =
    lineStep > 0 ? lineStep * 4 : formato === "pauta-guiada" ? 60 : 40;

  const drawRow = (label: string, example: string) => {
    if (y + altRenglon > H - 40) return;

    ctx.fillStyle = "#999";
    ctx.font = `italic 13px ${fontBase}`;
    ctx.fillText(label, mx, y - 5);

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.font = `bold ${altRenglon * 0.7}px ${fontBase}`;
    ctx.fillText(example, mx, y + altRenglon * 0.6);

    ctx.strokeStyle = "#E0E0E0";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(mx + ctx.measureText(example).width + 20, y + altRenglon * 0.65);
    ctx.lineTo(W - 30, y + altRenglon * 0.65);
    ctx.stroke();

    y += altRenglon + 10;
  };

  const drawTrazos = () => {
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const bx = mx + i * 70;
      ctx.moveTo(bx, y + altRenglon);
      ctx.bezierCurveTo(bx + 10, y, bx + 30, y, bx + 35, y + altRenglon / 2);
      ctx.bezierCurveTo(bx + 40, y + altRenglon, bx + 60, y + altRenglon, bx + 70, y + altRenglon / 2);
    }
    ctx.stroke();

    ctx.fillStyle = "#999";
    ctx.font = `italic 13px ${fontBase}`;
    ctx.fillText("Bucles · Espirales · Trazos libres", mx, y - 5);
    y += altRenglon + 20;
  };

  if (contenido.trazos) drawTrazos();
  if (contenido.vocalesMay) drawRow("Vocales Mayúsculas", "A E I O U");
  if (contenido.vocalesMin) drawRow("Vocales minúsculas", "a e i o u");
  if (contenido.alfabetoMay) drawRow("Alfabeto Mayúsculas", "A B C D E F G ...");
  if (contenido.alfabetoMin) drawRow("Alfabeto minúsculas", "a b c d e f g ...");
  if (contenido.silabas) drawRow("Sílabas", "ma me mi mo mu");
  if (contenido.palabras) drawRow("Palabras", "mamá · papá · sol · casa");
  if (contenido.frases) drawRow("Frase", "Mi mamá me mima.");
  if (contenido.textos) drawRow("Texto", "El sol brilla. El mar canta. ...");
}

// ──────────────────────────────────────────────────────────────────────────────
// RENDER DE TEXTO LIBRE EN CANVAS
// ──────────────────────────────────────────────────────────────────────────────

function drawTextoLibre(
  ctx: CanvasRenderingContext2D,
  config: Config
) {
  const { textoLibre, margen, formato, tipoLetra } = config;
  const mx = margen === "con" ? 75 : 35;
  const rightX = W - 30;
  const fontBase = 
    tipoLetra === "escolar" ? "Georgia, serif" : 
    tipoLetra === "punteada" ? "Georgia, serif" : 
    "Arial, sans-serif";
  const isPunteada = tipoLetra === "punteada";

  // Altura de renglón según numLineas
  const numLineas = textoLibre.numLineas;
  const altRenglon = Math.floor((H - 140) / numLineas);
  const fontSize = Math.floor(altRenglon * 0.55);

  // Encabezado
  if (textoLibre.enunciado.trim()) {
    ctx.fillStyle = "#1A1A1A";
    ctx.font = `bold ${Math.min(22, fontSize * 0.9)}px ${fontBase}`;
    ctx.fillText(textoLibre.enunciado, mx, 55);
    // Línea bajo enunciado
    ctx.strokeStyle = "#0EA5E9";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, 62);
    ctx.lineTo(rightX, 62);
    ctx.stroke();
  }

  // Texto a copiar: dividir en palabras y envolver en líneas
  const texto = textoLibre.texto.trim();
  let startY = 80;

  if (texto) {
    // Calculamos el wrapping del texto por líneas
    ctx.font = `${fontSize}px ${fontBase}`;
    const maxWidth = rightX - mx - 10;

    // Dividir por líneas explícitas primero
    const paragrafs = texto.split("\n");
    const lineas: string[] = [];

    for (const para of paragrafs) {
      if (!para.trim()) { lineas.push(""); continue; }
      const palabras = para.split(" ");
      let lineaActual = "";
      for (const palabra of palabras) {
        const prueba = lineaActual ? lineaActual + " " + palabra : palabra;
        if (ctx.measureText(prueba).width > maxWidth && lineaActual) {
          lineas.push(lineaActual);
          lineaActual = palabra;
        } else {
          lineaActual = prueba;
        }
      }
      if (lineaActual) lineas.push(lineaActual);
    }

    // Dibujar cada línea sobre su renglón
    let lineIdx = 0;
    let y = startY + altRenglon * 0.75;

    for (const linea of lineas) {
      if (y > H - 60) break;

      if (isPunteada) {
        ctx.strokeStyle = "rgba(14, 100, 200, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 3]);
        ctx.font = `${fontSize}px ${fontBase}`;
        ctx.strokeText(linea, mx, y);
        ctx.setLineDash([]);
      } else {
        // Texto guía (el texto a copiar, semitransparente)
        ctx.fillStyle = "rgba(14, 100, 200, 0.55)";
        ctx.font = `${fontSize}px ${fontBase}`;
        ctx.fillText(linea, mx, y);
      }

      // Línea punteada para que el alumno escriba debajo (si hay espacio)
      if (lineIdx % 2 === 0 && y + altRenglon < H - 60) {
        // Línea de práctica (vacía)
        ctx.strokeStyle = "#B3D1F7";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(mx, y + altRenglon * 0.9);
        ctx.lineTo(rightX, y + altRenglon * 0.9);
        ctx.stroke();
        ctx.setLineDash([]);
        y += altRenglon * 2;
      } else {
        y += altRenglon;
      }

      lineIdx++;
    }
  } else {
    // Placeholder si no hay texto
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.font = `italic ${fontSize}px ${fontBase}`;
    ctx.fillText("Escribe el texto que quieres practicar...", mx, startY + altRenglon * 0.75);
  }

  // Pie de página
  if (textoLibre.pieDePageina.trim()) {
    ctx.fillStyle = "#888";
    ctx.font = `italic ${Math.min(14, fontSize * 0.6)}px ${fontBase}`;
    ctx.fillText(textoLibre.pieDePageina, mx, H - 30);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(mx, H - 42);
    ctx.lineTo(rightX, H - 42);
    ctx.stroke();
  }

  // Marca de agua sutil
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = "rgba(14,165,233,0.04)";
  ctx.font = "bold 72px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Caligra-Fiate", 0, 0);
  ctx.restore();
}

// ──────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

const STEPS = ["Formato", "Márgenes", "Letra", "Contenido", "¡Tu ficha!"];

const defaultConfig: Config = {
  formato: null,
  margen: null,
  tipoLetra: null,
  modoContenido: null,
  contenido: {
    trazos: false,
    vocalesMay: false,
    vocalesMin: false,
    alfabetoMay: false,
    alfabetoMin: false,
    silabas: false,
    palabras: false,
    frases: false,
    textos: false,
  },
  textoLibre: {
    enunciado: "",
    texto: "",
    pieDePageina: "",
    numLineas: 12,
  },
};

export default function CaligrafiatePage() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [contactPageUrl, setContactPageUrl] = useState(CONTACT_ROUTE);
  const [contactQrDataUrl, setContactQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateConfig = <K extends keyof Config>(key: K, val: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: val }));

  const updateTextoLibre = (key: keyof TextoLibre, val: string | number) =>
    setConfig((prev) => ({
      ...prev,
      textoLibre: { ...prev.textoLibre, [key]: val },
    }));

  const toggleContenido = (k: keyof Contenido) =>
    setConfig((prev) => ({
      ...prev,
      contenido: { ...prev.contenido, [k]: !prev.contenido[k] },
    }));

  const hasAnyContenido =
    config.modoContenido === "libre"
      ? config.textoLibre.texto.trim().length > 0
      : Object.values(config.contenido).some(Boolean);

  const goNext = () => {
    setAnimDir("forward");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goBack = () => {
    setAnimDir("back");
    setStep((s) => Math.max(s - 1, 0));
  };

  // Canvas generation
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Solo dibujar si tenemos los datos mínimos (formato y margen)
    // Opcionalmente, podemos dibujar una hoja vacía
    drawLineasGuia(ctx, config.formato, config.margen);
    
    if (config.modoContenido === "libre") {
      drawTextoLibre(ctx, config);
    } else if (config.modoContenido === "predefinido") {
      drawContenidoSample(ctx, config);
    }

    // Marca de agua sutil
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.fillStyle = "rgba(14,165,233,0.05)";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Caligra-Fiate", 0, 0);
    ctx.restore();
  }, [config]);

  // Actualización PROACTIVA del canvas en cada cambio de configuración
  useEffect(() => {
    renderCanvas();
  }, [config, renderCanvas]);

  // QR para acceso rapido a la pagina de contacto
  useEffect(() => {
    const resolvedUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${CONTACT_ROUTE}`
        : CONTACT_ROUTE;

    setContactPageUrl(resolvedUrl);

    let isMounted = true;

    const generateQr = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const dataUrl = await QRCode.toDataURL(resolvedUrl, {
          width: 220,
          margin: 1,
          color: {
            dark: "#1A1A1A",
            light: "#FFFFFFFF",
          },
        });

        if (isMounted) {
          setContactQrDataUrl(dataUrl);
        }
      } catch {
        if (isMounted) {
          setContactQrDataUrl("");
        }
      }
    };

    generateQr();

    return () => {
      isMounted = false;
    };
  }, []);

  // ── Descarga PNG ──────────────────────────────────────────────────────────
  const descargarPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `ficha-caligrafia-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // ── Descarga PDF ──────────────────────────────────────────────────────────
  const descargarPdf = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGeneratingPdf(true);
    try {
      const { PDFDocument } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();
      // A4 en puntos: 595.28 x 841.89
      const page = pdfDoc.addPage([595.28, 841.89]);

      // Convertir canvas a PNG bytes
      const pngDataUrl = canvas.toDataURL("image/png");
      const pngBase64 = pngDataUrl.split(",")[1];
      const pngBytes = Uint8Array.from(atob(pngBase64), (c) => c.charCodeAt(0));

      const pngImage = await pdfDoc.embedPng(pngBytes);
      const { width, height } = page.getSize();

      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width,
        height,
      });

      const pdfBytes = await pdfDoc.save();
      // Usamos any para evitar problemas de compatibilidad de tipos con Uint8Array y ArrayBufferLike
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ficha-caligrafia-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // ── Validation per step ──────────────────────────────────────────────────
  const canContinue = () => {
    if (step === 0) return config.formato !== null;
    if (step === 1) return config.margen !== null;
    if (step === 2) return config.tipoLetra !== null;
    if (step === 3) return config.modoContenido !== null && hasAnyContenido;
    return true;
  };

  return (
    <main className={styles.main}>
      {/* HEADER */}
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>← Inicio</Link>
        <h1 className={styles.brand}>
          CALIGRA<span className={styles.brandUnder}>-</span>F<span className={styles.pencilAccentLetter}>I</span>ATE
        </h1>
        <span className={styles.tagline}>¡Aprende Jugando con Letras Mágicas! ✨</span>
      </header>

      {/* STEPPER */}
      <div className={styles.stepper}>
        {STEPS.map((label, i) => (
          <div key={i} className={styles.stepWrap}>
            <div
              className={`${styles.stepDot} ${i < step ? styles.dotDone : ""} ${i === step ? styles.dotActive : ""}`}
              onClick={() => i < step && setStep(i)}
              role={i < step ? "button" : undefined}
              title={i < step ? `Ir al paso ${i + 1}` : undefined}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`${styles.stepLabel} ${i === step ? styles.labelActive : ""}`}>{label}</span>
            {i < STEPS.length - 1 && (
              <div className={`${styles.stepLine} ${i < step ? styles.lineDone : ""}`} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.layoutWrapper}>
        <div className={styles.controlsSide}>
          {/* CARD */}
          <div className={styles.card} data-anim={animDir} key={step}>

        {/* ──── PASO 0: Formato ────────────────────────────────────────────── */}
        {step === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>1</span>
              Elige el formato de hoja
            </h2>
            <p className={styles.stepDesc}>Selecciona el tipo de pauta sobre la que el alumno va a escribir:</p>
            <div className={styles.optionGrid}>
              {(
                [
                  { val: "pauta-guiada", icon: "📏", label: "Pauta guiada", sub: "3 líneas por renglón (ascendente, base, descendente)" },
                  { val: "pauta-normal", icon: "📄", label: "Pauta normal", sub: "2 líneas por renglón" },
                  { val: "cuadricula-5", icon: "⊞", label: "Cuadrícula 5mm", sub: "Integrada en cuadrícula de 5mm" },
                  { val: "cuadricula-4", icon: "⊟", label: "Cuadrícula 4mm", sub: "Integrada en cuadrícula de 4mm" },
                ] as const
              ).map(({ val, icon, label, sub }) => (
                <button
                  key={val}
                  className={`${styles.optionCard} ${config.formato === val ? styles.optionSelected : ""}`}
                  onClick={() => updateConfig("formato", val)}
                >
                  <span className={styles.optionIcon}>{icon}</span>
                  <strong>{label}</strong>
                  <span className={styles.optionSub}>{sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ──── PASO 1: Márgenes ───────────────────────────────────────────── */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>2</span>
              Configuración de la página
            </h2>
            <p className={styles.stepDesc}>¿La ficha tendrá margen lateral?</p>
            <div className={styles.optionRow}>
              {(
                [
                  { val: "sin", icon: "⛶", label: "Sin margen", sub: "El área de escritura ocupa toda la página" },
                  { val: "con", icon: "📋", label: "Con margen", sub: "Línea roja vertical a la izquierda" },
                ] as const
              ).map(({ val, icon, label, sub }) => (
                <button
                  key={val}
                  className={`${styles.optionCard} ${styles.optionCardLarge} ${config.margen === val ? styles.optionSelected : ""}`}
                  onClick={() => updateConfig("margen", val)}
                >
                  <span className={styles.optionIcon}>{icon}</span>
                  <strong>{label}</strong>
                  <span className={styles.optionSub}>{sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ──── PASO 2: Tipo de Letra ──────────────────────────────────────── */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>3</span>
              Tipo de letra
            </h2>
            <p className={styles.stepDesc}>Seleccione el estilo de letra:</p>
            <div className={styles.optionRow}>
              {(
                [
                  {
                    val: "escolar",
                    icon: "🏠",
                    label: "Letra escolar",
                    sub: "Tipo 'casa' enlazada.",
                    preview: "mamá",
                    font: "Georgia, serif",
                  },
                  {
                    val: "punteada",
                    icon: "✏️",
                    label: "Letra punteada",
                    sub: "Para calcar y repasar.",
                    preview: "mamá",
                    font: "Georgia, serif",
                    isPunteada: true,
                  },
                  {
                    val: "imprenta",
                    icon: "🔤",
                    label: "Imprenta / Mayúsculas",
                    sub: "Para textos completos.",
                    preview: "MAMÁ",
                    font: "Arial, sans-serif",
                  },
                ] as const
              ).map(({ val, icon, label, sub, preview, font, isPunteada }: any) => (
                <button
                  key={val}
                  className={`${styles.optionCard} ${styles.optionCardLarge} ${config.tipoLetra === val ? styles.optionSelected : ""}`}
                  onClick={() => updateConfig("tipoLetra", val)}
                >
                  <strong>{label}</strong>
                  <span className={styles.optionSub}>{sub}</span>
                  <span className={isPunteada ? styles.letterPreviewDotted : styles.letterPreview} style={{ fontFamily: font }}>
                    {preview}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ──── PASO 3: Contenido ──────────────────────────────────────────── */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>4</span>
              ¿Qué quieres trabajar?
            </h2>

            {/* SELECTOR DE MODO */}
            {config.modoContenido === null && (
              <>
                <p className={styles.stepDesc}>Elige cómo quieres crear el contenido de tu ficha:</p>
                <div className={styles.modoGrid}>
                  <button
                    className={styles.modoCard}
                    onClick={() => updateConfig("modoContenido", "predefinido")}
                  >
                    <span className={styles.modoIcon}>🎯</span>
                    <strong>Contenido predefinido</strong>
                    <span className={styles.modoDesc}>
                      Elige entre trazos, vocales, sílabas, palabras o frases. Ideal para seguir el currículum.
                    </span>
                    <span className={styles.modoCta}>Seleccionar categorías →</span>
                  </button>

                  <button
                    className={`${styles.modoCard} ${styles.modoCardLibre}`}
                    onClick={() => updateConfig("modoContenido", "libre")}
                  >
                    <span className={styles.modoIcon}>✏️</span>
                    <strong>Texto libre</strong>
                    <span className={styles.modoDesc}>
                      Escribe tú el texto exacto que quieres que el alumno practique. Vista previa en tiempo real.
                    </span>
                    <span className={styles.modoCta}>Escribir mi texto →</span>
                  </button>
                </div>
              </>
            )}

            {/* MODO PREDEFINIDO */}
            {config.modoContenido === "predefinido" && (
              <>
                <p className={styles.stepDesc}>
                  Selecciona el contenido que aparecerá en la ficha. Puedes elegir varios:
                  <button
                    className={styles.cambiarModoBtn}
                    onClick={() => updateConfig("modoContenido", null)}
                  >
                    ← Cambiar modo
                  </button>
                </p>

                <div className={styles.checkGroups}>
                  <div className={styles.checkGroup}>
                    <h3 className={styles.groupTitle}>🖊️ Iniciación y Trazos</h3>
                    <label className={`${styles.checkRow} ${config.contenido.trazos ? styles.checkRowActive : ""}`}>
                      <input type="checkbox" checked={config.contenido.trazos} onChange={() => toggleContenido("trazos")} />
                      <span>Ejercicios de fuerza / trazo (Bucle, espiral, líneas)</span>
                    </label>
                  </div>

                  <div className={styles.checkGroup}>
                    <h3 className={styles.groupTitle}>🔤 Letras y Sílabas</h3>
                    {(
                      [
                        { k: "vocalesMay", label: "Vocales Mayúsculas (A E I O U)" },
                        { k: "vocalesMin", label: "Vocales minúsculas ligadas (a e i o u)" },
                        { k: "alfabetoMay", label: "Alfabeto Mayúsculas (con guía / sin guía)" },
                        { k: "alfabetoMin", label: "Alfabeto minúsculas ligadas (con guía / sin guía)" },
                        { k: "silabas", label: "Sílabas Mayúsculas / minúsculas" },
                      ] as { k: keyof Contenido; label: string }[]
                    ).map(({ k, label }) => (
                      <label key={k} className={`${styles.checkRow} ${config.contenido[k] ? styles.checkRowActive : ""}`}>
                        <input type="checkbox" checked={config.contenido[k]} onChange={() => toggleContenido(k)} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>

                  <div className={styles.checkGroup}>
                    <h3 className={styles.groupTitle}>📝 Palabras y Textos</h3>
                    {(
                      [
                        { k: "palabras", label: "Palabras (Mayúsculas / minúsculas)" },
                        { k: "frases", label: "Frases (Mayúsculas / minúsculas)" },
                        { k: "textos", label: "Textos (Por líneas o Textos completos)" },
                      ] as { k: keyof Contenido; label: string }[]
                    ).map(({ k, label }) => (
                      <label key={k} className={`${styles.checkRow} ${config.contenido[k] ? styles.checkRowActive : ""}`}>
                        <input type="checkbox" checked={config.contenido[k]} onChange={() => toggleContenido(k)} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {!hasAnyContenido && (
                  <p className={styles.warning}>⚠️ Selecciona al menos un tipo de contenido para continuar.</p>
                )}
              </>
            )}

            {/* MODO TEXTO LIBRE */}
            {config.modoContenido === "libre" && (
              <>
                <p className={styles.stepDesc}>
                  Escribe exactamente el texto que el alumno va a copiar:
                  <button
                    className={styles.cambiarModoBtn}
                    onClick={() => updateConfig("modoContenido", null)}
                  >
                    ← Cambiar modo
                  </button>
                </p>

                <div className={styles.textoLibreForm}>
                  {/* Enunciado */}
                  <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor="enunciado">
                      📌 Enunciado / Título de la ficha
                    </label>
                    <input
                      id="enunciado"
                      type="text"
                      className={styles.formInput}
                      placeholder="Ej: Copia estas palabras con cuidado"
                      maxLength={80}
                      value={config.textoLibre.enunciado}
                      onChange={(e) => updateTextoLibre("enunciado", e.target.value)}
                    />
                  </div>

                  {/* Texto principal */}
                  <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor="texto">
                      ✍️ Texto a practicar <span className={styles.formRequired}>*</span>
                    </label>
                    <textarea
                      id="texto"
                      className={styles.formTextarea}
                      placeholder={"Escribe aquí el texto que quieres que el alumno copie...\n\nPuedes escribir varias líneas."}
                      maxLength={2000}
                      rows={6}
                      value={config.textoLibre.texto}
                      onChange={(e) => updateTextoLibre("texto", e.target.value)}
                    />
                    <span className={styles.charCount}>
                      {config.textoLibre.texto.length} / 2000 caracteres
                    </span>
                  </div>

                  {/* Tamaño de líneas */}
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>📐 Tamaño de letra (nº de líneas)</label>
                    <div className={styles.lineasRow}>
                      {([8, 12, 16] as NumLineas[]).map((n) => (
                        <button
                          key={n}
                          className={`${styles.lineasBtn} ${config.textoLibre.numLineas === n ? styles.lineasBtnActive : ""}`}
                          onClick={() => updateTextoLibre("numLineas", n)}
                        >
                          <span className={styles.lineasNum}>{n}</span>
                          <span className={styles.lineasLabel}>
                            {n === 8 ? "Grande\n(Infantil)" : n === 12 ? "Mediano\n(1º-2º)" : "Normal\n(3º-6º)"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pie de página */}
                  <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor="piepagina">
                      📎 Pie de página <span className={styles.formOptional}>(opcional)</span>
                    </label>
                    <input
                      id="piepagina"
                      type="text"
                      className={styles.formInput}
                      placeholder="Ej: Nombre: ____________   Fecha: ________"
                      maxLength={80}
                      value={config.textoLibre.pieDePageina}
                      onChange={(e) => updateTextoLibre("pieDePageina", e.target.value)}
                    />
                  </div>
                </div>

                {!hasAnyContenido && (
                  <p className={styles.warning}>⚠️ Escribe el texto que quieres practicar para continuar.</p>
                )}
              </>
            )}
          </div>
        )}

        {/* ──── PASO 4: Preview + Descarga ─────────────────────────────────── */}
        {step === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>🎉</span>
              ¡Tu ficha está lista!
            </h2>
            <div className={styles.summaryBar} style={{ marginBottom: "2rem" }}>
              <span>📐 {config.formato?.replace("-", " ").replace("cuadricula", "Cuadrícula") ?? "—"}</span>
              <span>⬛ Margen: {config.margen === "con" ? "Sí" : "No"}</span>
              <span>✍️ {config.tipoLetra === "escolar" ? "Letra escolar" : config.tipoLetra === "punteada" ? "Letra punteada" : "Imprenta"}</span>
              {config.modoContenido === "libre" ? (
                <>
                  <span>✏️ Texto libre · {config.textoLibre.numLineas} líneas</span>
                </>
              ) : (
                <span>📋 {contentLabel(config.contenido)}</span>
              )}
            </div>

            <div className={styles.contactQrCard}>
              <div className={styles.contactQrContent}>
                <h3 className={styles.contactQrTitle}>QR de contacto</h3>
                <p className={styles.contactQrText}>
                  Escanea este codigo QR para abrir nuestra pagina de contacto.
                </p>
                <Link className={styles.contactQrLink} href={CONTACT_ROUTE}>
                  Ir a contacto
                </Link>
              </div>

              <div className={styles.contactQrImageWrap}>
                {contactQrDataUrl ? (
                  <Image
                    src={contactQrDataUrl}
                    alt={`QR para abrir ${contactPageUrl}`}
                    className={styles.contactQrImage}
                    width={176}
                    height={176}
                    unoptimized
                  />
                ) : (
                  <div className={styles.contactQrFallback}>
                    Cargando QR...
                  </div>
                )}
              </div>
            </div>

            <div className={styles.downloadBar}>
              <button onClick={descargarPng} className={styles.downloadBtn} id="btn-descargar-png">
                🖼️ Descargar PNG
              </button>
              <button
                onClick={descargarPdf}
                className={`${styles.downloadBtn} ${styles.downloadBtnPdf}`}
                disabled={isGeneratingPdf}
                id="btn-descargar-pdf"
              >
                {isGeneratingPdf ? "⏳ Generando PDF..." : "📄 Descargar PDF"}
              </button>
              <button
                onClick={() => { setConfig(defaultConfig); setStep(0); }}
                className={styles.resetBtn}
              >
                🔄 Nueva ficha
              </button>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className={styles.navBar}>
          {step > 0 && step < STEPS.length - 1 && (
            <button className={styles.btnBack} onClick={goBack}>← Anterior</button>
          )}
          {step < STEPS.length - 1 && (
            <button
              className={`${styles.btnNext} ${!canContinue() ? styles.btnDisabled : ""}`}
              onClick={canContinue() ? goNext : undefined}
              disabled={!canContinue()}
            >
              {step === STEPS.length - 2 ? "✨ ¡Generar ficha!" : "Siguiente →"}
            </button>
          )}
        </div>
      </div>
    </div>

    {/* SIDEBAR PREVIEW */}
      <aside className={styles.previewSide}>
        <h3 className={styles.previewTitle}>✨ Vista Previa</h3>
        <div className={styles.canvasWrapper}>
          {(config.formato || config.margen) ? (
             <canvas
              ref={canvasRef}
              width={W}
              height={H}
              className={styles.canvas}
            />
          ) : (
            <div className={styles.previewEmpty}>
              <span className={styles.previewEmptyIcon}>📄</span>
              <p>Selecciona un formato para empezar a ver tu ficha en tiempo real.</p>
            </div>
          )}
        </div>
        
        {step === 4 && (
          <p style={{ fontSize: "0.85rem", color: "#64748b", textAlign: "center", fontStyle: "italic" }}>
            Revisa que todo esté correcto antes de descargar.
          </p>
        )}
      </aside>
    </div>
  </main>
);
}
