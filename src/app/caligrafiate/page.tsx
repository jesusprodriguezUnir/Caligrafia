"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./caligrafiate.module.css";

// ──────────────────────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────────────────────

type Formato = "pauta-guiada" | "pauta-normal" | "cuadricula-5" | "cuadricula-4" | null;
type Margen = "sin" | "con" | null;
type TipoLetra = "escolar" | "imprenta" | null;

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

interface Config {
  formato: Formato;
  margen: Margen;
  tipoLetra: TipoLetra;
  contenido: Contenido;
}

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS DE CANVAS
// ──────────────────────────────────────────────────────────────────────────────

const W = 794; // A4 @ 96dpi ≈ 794px wide
const H = 1123;

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

  // Fondo
  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(mx, 20, W - mx - 20, H - 40);

  if (formato === "cuadricula-4" || formato === "cuadricula-5") {
    // Cuadrícula
    ctx.strokeStyle = "#D1E8FF";
    ctx.lineWidth = 0.6;
    for (let x = mx; x <= W - 20; x += lineStep) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, H - 20); ctx.stroke();
    }
    for (let y = 20; y <= H - 20; y += lineStep) {
      ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }
    // Líneas más oscuras cada 5
    ctx.strokeStyle = "#A3C4E0";
    ctx.lineWidth = 0.8;
    for (let x = mx; x <= W - 20; x += lineStep * 5) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, H - 20); ctx.stroke();
    }
    for (let y = 20; y <= H - 20; y += lineStep * 5) {
      ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }
  } else {
    // Pauta de renglones
    const altRenglon = formato === "pauta-guiada" ? 60 : 40;
    let y = 80;
    while (y + altRenglon < H - 30) {
      if (formato === "pauta-guiada") {
        // 3 líneas: ascendente, base, descendente
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
        // Pauta normal: base + interlineado
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

  // Margen rojo
  if (margen === "con") {
    ctx.strokeStyle = "#FF9999";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(mx, 20); ctx.lineTo(mx, H - 20); ctx.stroke();
  }

  // Borde de hoja
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

    // Etiqueta pequeña
    ctx.fillStyle = "#999";
    ctx.font = `italic 13px ${fontBase}`;
    ctx.fillText(label, mx, y - 5);

    // Texto guía (punteado translúcido)
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.font = `bold ${altRenglon * 0.7}px ${fontBase}`;
    ctx.fillText(example, mx, y + altRenglon * 0.6);

    // Línea de práctica (vacía)
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
    // Bucle
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
// COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

const STEPS = ["Formato", "Márgenes", "Letra", "Contenido", "¡Tu ficha!"];

const defaultConfig: Config = {
  formato: null,
  margen: null,
  tipoLetra: null,
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
};

export default function CaligrafiatePage() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateConfig = <K extends keyof Config>(key: K, val: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: val }));

  const toggleContenido = (k: keyof Contenido) =>
    setConfig((prev) => ({
      ...prev,
      contenido: { ...prev.contenido, [k]: !prev.contenido[k] },
    }));

  const hasAnyContenido = Object.values(config.contenido).some(Boolean);

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
    if (!canvas || step !== 4) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawLineasGuia(ctx, config.formato, config.margen);
    drawContenidoSample(ctx, config);

    // Marca de agua sutil
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.fillStyle = "rgba(14,165,233,0.05)";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Caligra-Fíate", 0, 0);
    ctx.restore();
  }, [config, step]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const descargar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `ficha-caligrafia-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // ── Validation per step ──────────────────────────────────────────────────
  const canContinue = () => {
    if (step === 0) return config.formato !== null;
    if (step === 1) return config.margen !== null;
    if (step === 2) return config.tipoLetra !== null;
    if (step === 3) return hasAnyContenido;
    return true;
  };

  return (
    <main className={styles.main}>
      {/* HEADER */}
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>← Inicio</Link>
        <h1 className={styles.brand}>
          Caligra<span className={styles.brandUnder}>-</span>Fíate
        </h1>
        <span className={styles.tagline}>Tu ficha. Tu ritmo. Tu letra. ✍️</span>
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
            <p className={styles.stepDesc}>Elige el estilo de letra según la edad del alumno:</p>
            <div className={styles.optionRow}>
              {(
                [
                  {
                    val: "escolar",
                    icon: "🏠",
                    label: "Letra escolar",
                    sub: "Tipo 'casa' enlazada. Ideal para Infantil y primeros ciclos de Primaria.",
                    preview: "mamá",
                    font: "Georgia, serif",
                  },
                  {
                    val: "imprenta",
                    icon: "🔤",
                    label: "Imprenta / Mayúsculas",
                    sub: "Para alumnos más mayores. Enfocado en frases y textos completos.",
                    preview: "MAMÁ",
                    font: "Arial, sans-serif",
                  },
                ] as const
              ).map(({ val, icon, label, sub, preview, font }) => (
                <button
                  key={val}
                  className={`${styles.optionCard} ${styles.optionCardLarge} ${config.tipoLetra === val ? styles.optionSelected : ""}`}
                  onClick={() => updateConfig("tipoLetra", val)}
                >
                  <span className={styles.optionIcon}>{icon}</span>
                  <strong>{label}</strong>
                  <span className={styles.optionSub}>{sub}</span>
                  <span className={styles.letterPreview} style={{ fontFamily: font }}>
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
            <p className={styles.stepDesc}>Selecciona el contenido que aparecerá en la ficha. Puedes elegir varios:</p>

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
          </div>
        )}

        {/* ──── PASO 4: Preview + Descarga ─────────────────────────────────── */}
        {step === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>🎉</span>
              ¡Tu ficha está lista!
            </h2>
            <div className={styles.summaryBar}>
              <span>📐 {config.formato?.replace("-", " ").replace("cuadricula", "Cuadrícula") ?? "—"}</span>
              <span>⬛ Margen: {config.margen === "con" ? "Sí" : "No"}</span>
              <span>✍️ {config.tipoLetra === "escolar" ? "Letra escolar" : "Imprenta"}</span>
              <span>📋 {contentLabel(config.contenido)}</span>
            </div>
            <div className={styles.canvasWrapper}>
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                className={styles.canvas}
              />
            </div>
            <div className={styles.downloadBar}>
              <button onClick={descargar} className={styles.downloadBtn}>
                ⬇️ Descargar PNG
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
    </main>
  );
}
