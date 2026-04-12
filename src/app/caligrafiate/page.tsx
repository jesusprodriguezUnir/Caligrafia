"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./caligrafiate.module.css";

// ──────────────────────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────────────────────

type Formato = "pauta-guiada" | "pauta-normal" | "cuadricula-5" | "cuadricula-4" | null;
type Margen = "sin" | "con" | "dibujo" | null;
type MargenDibujo = "tren" | "barco" | "coche" | "arbol" | "casa" | "unicornio" | "perro" | "gato" | "nino" | "nina";
type TipoLetraVal =
  | "massallera"
  | "massallera-dot"
  | "escolar"
  | "escolar-dot"
  | "mestra-pauta"
  | "mestra-pauta-dot"
  | "mestra-guiada"
  | "mestra-guiada-dot";

type TipoLetra = TipoLetraVal[] | null;
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
  margenDibujo: MargenDibujo;
  tipoLetra: TipoLetra;
  modoContenido: ModoContenido;
  contenido: Contenido;
  textoLibre: TextoLibre;
  previewTexts: Record<string, string>;
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

const getMarginX = (margen: Margen) => {
  if (margen === "sin") return 20;
  if (margen === "con") return 60;
  if (margen === "dibujo") return 85;
  return 20;
};

const MARGEN_ICONS: Record<MargenDibujo, string> = {
  tren: "🚂",
  barco: "🚢",
  coche: "🚗",
  arbol: "🌳",
  casa: "🏠",
  unicornio: "🦄",
  perro: "🐶",
  gato: "🐱",
  nino: "👦",
  nina: "👧",
};

function drawLineasGuia(
  ctx: CanvasRenderingContext2D,
  formato: Formato,
  margen: Margen,
  margenDibujo?: MargenDibujo
) {
  const mx = getMarginX(margen);
  const lineStep = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);

  // Fondo sutil para la hoja
  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(mx, 20, W - mx - 20, H - 40);

  const icon = margenDibujo ? MARGEN_ICONS[margenDibujo] : "";

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
    
    if (margen === "dibujo" && icon) {
      ctx.font = "28px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let gridY = 20; gridY <= H - lineStep * 5; gridY += lineStep * 5) {
        ctx.fillText(icon, mx - 40, gridY + lineStep * 2.5);
      }
    }
  } else {
    // Sistema Montessori (Pisos de las letras: Cielo, Camino, Tierra)
    const h = 22; // Altura de cada piso
    const gap = 30; // Separación entre renglones
    let lineY = 100;

    while (lineY + h * 3 < H - 50) {
      const topY = lineY;
      const midTop = topY + h;
      const midBot = topY + h * 2;
      const botY = topY + h * 3;

      if (formato === "pauta-guiada") {
        // 1. Sombrear zonas (Colores exactos del PDF)
        ctx.fillStyle = "#E0F2FE"; // Cielo (Azul suave)
        ctx.fillRect(mx, topY, W - mx - 20, h);
        // Camino (Blanco - ya está de fondo)
        ctx.fillStyle = "#FFEDD5"; // Tierra (Melocotón/Tan muy suave)
        ctx.fillRect(mx, midBot, W - mx - 20, h);

        // 2. Líneas
        ctx.save();
        ctx.lineWidth = 1;
        // Línea 1 (Cielo) - Cian sólido
        ctx.strokeStyle = "#0EA5E9";
        ctx.beginPath(); ctx.moveTo(mx, topY); ctx.lineTo(W - 20, topY); ctx.stroke();
        // Línea 4 (Tierra) - Marrón sólido
        ctx.strokeStyle = "#92400E";
        ctx.beginPath(); ctx.moveTo(mx, botY); ctx.lineTo(W - 20, botY); ctx.stroke();
        // Líneas 2 y 3 (Camino) - Discontinuas Gris oscuro
        ctx.strokeStyle = "#6B7280";
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(mx, midTop); ctx.lineTo(W - 20, midTop); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx, midBot); ctx.lineTo(W - 20, midBot); ctx.stroke();
        ctx.restore();
        
        // 3. Iconos Guía (Emoji unificado para todas las pautas)
        if (margen === "dibujo" && icon) {
          ctx.save();
          const iconX = mx - 42;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "28px Arial";
          // Centrado en el carril central (Camino)
          ctx.fillText(icon, iconX, midTop + h/2);
          ctx.restore();
        }

        lineY += h * 3 + gap;
      } else {
        // Pauta normal (Solo 2 líneas sitting on the imaginary central path)
        ctx.strokeStyle = "#6B7280";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mx, midTop); ctx.lineTo(W - 20, midTop); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx, midBot); ctx.lineTo(W - 20, midBot); ctx.stroke();
        
        if (margen === "dibujo" && icon) {
          ctx.font = "28px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(icon, mx - 42, midTop + h/2);
        }
        lineY += h * 3 + gap;
      }
    }
  }

  // Marco final de la hoja
  ctx.strokeStyle = "#1A1A1A";
  ctx.lineWidth = 2.5;
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

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS DE DIBUJO DE TEXTO
// ──────────────────────────────────────────────────────────────────────────────

const drawTextWithStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  fontSize: number,
  isPunteada: boolean,
  isDottedVersion: boolean,
  color?: string
) => {
  ctx.font = `${fontSize}px ${font}`;
  
  // Si es punteada, usamos un gris claro apto para calcomanía (tracing)
  const drawColor = isPunteada ? "rgba(180, 180, 180, 0.85)" : (color || "rgba(14, 100, 200, 0.55)");

  if (isPunteada && !isDottedVersion) {
    // Para fuentes sin versión punteada real, simulamos con strokeText discontinuo
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = Math.max(1, fontSize * 0.025);
    ctx.setLineDash([1.5, 3.5]); // Puntos definidos
    ctx.strokeText(text, x, y);
    ctx.setLineDash([]);
  } else {
    // Para versiones punteadas reales o normales, usamos fillText
    ctx.fillStyle = drawColor;
    ctx.fillText(text, x, y);
  }
};

function drawContenidoSample(
  ctx: CanvasRenderingContext2D,
  config: Config
) {
  const { contenido, tipoLetra, margen, formato } = config;
  const h = 22; // Altura carril para Montessori
  const gap = 30; // Gap entre Montessori
  const mx = getMarginX(margen) + 15;

  const selectedFonts = tipoLetra && tipoLetra.length > 0 ? tipoLetra : ["escolar" as TipoLetraVal];

  let fontIdx = 0;

  const isCuadricula = formato === "cuadricula-4" || formato === "cuadricula-5";
  const lineStep = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

  // For grid modes: calculate band dimensions
  const cellSize = lineStep || 20;
  const gridRowsPerText = 3; // text occupies 3 major grid rows
  const bandHeight = cellSize * gridRowsPerText * 5; // each major row = 5 cells
  const gridGap = cellSize * 5; // one major row of gap
  const gridFontSize = Math.round(bandHeight * 0.35);
  const gridStartY = 20 + cellSize * 5; // first major grid line after top

  // For pauta modes
  const fullRenglon = formato === "pauta-guiada" ? h * 3 + gap : (isCuadricula ? bandHeight + gridGap : 40);

  // Track Y position
  let y = isCuadricula ? gridStartY : 100;

  const drawRow = (label: string, example: string) => {
    if (isCuadricula) {
      if (y + bandHeight > H - 40) return;
    } else {
      if (y + fullRenglon > H - 40) return;
    }

    const currentFontType = selectedFonts[fontIdx % selectedFonts.length];

    const fontBase =
      currentFontType === "massallera" || currentFontType === "massallera-dot" ? "Massallera, Georgia" :
        currentFontType === "escolar" || currentFontType === "escolar-dot" ? "Escolar, Georgia" :
          currentFontType?.startsWith("mestra-pauta") ? "Mestra Pauta, Georgia" :
            currentFontType?.startsWith("mestra-guiada") ? "Mestra Montessori, Georgia" :
              "Georgia";

    const isDottedVersion = !!(
      currentFontType === "escolar-dot" ||
      currentFontType === "mestra-pauta-dot" ||
      currentFontType === "mestra-guiada-dot"
    );

    const isPunteada = !!currentFontType?.includes("-dot");

    const fontToUse = isDottedVersion ?
      (currentFontType === "escolar-dot" ? "Escolar Dot" :
        currentFontType === "mestra-pauta-dot" ? "Mestra Pauta Dot" : "Mestra Montessori Dot")
      : fontBase;

    if (isCuadricula) {
      // Grid mode: auto-fit text to grid
      const bandTopY = y;
      const baselineY = bandTopY + Math.round(bandHeight * 0.78);

      // Subtle highlight band
      ctx.fillStyle = "rgba(255, 243, 224, 0.35)";
      ctx.fillRect(getMarginX(margen), bandTopY, W - getMarginX(margen) - 20, bandHeight);

      // Label
      ctx.fillStyle = "#999";
      ctx.font = `italic 11px Georgia`;
      ctx.fillText(label, mx, bandTopY - 4);

      // Text
      drawTextWithStyle(
        ctx,
        example,
        mx,
        baselineY,
        fontToUse,
        gridFontSize,
        isPunteada,
        isDottedVersion,
        "rgba(0,0,0,0.12)"
      );

      y += bandHeight + gridGap;
    } else {
      // Pauta modes (existing logic)
      const fontSize = formato === "pauta-guiada" ? h * 1.6 : 32;
      const textY = formato === "pauta-guiada" ? y + h * 2 : y + 25;

      ctx.fillStyle = "#999";
      ctx.font = `italic 11px Georgia`;
      ctx.fillText(label, mx, y - 10);

      drawTextWithStyle(
        ctx,
        example,
        mx,
        textY,
        fontToUse,
        fontSize,
        isPunteada,
        isDottedVersion,
        "rgba(0,0,0,0.12)"
      );

      ctx.strokeStyle = "#E0E0E0";
      ctx.lineWidth = 0.5;
      const textWidth = ctx.measureText(example).width;
      ctx.beginPath();
      ctx.moveTo(mx + textWidth + 20, textY);
      ctx.lineTo(W - 30, textY);
      ctx.stroke();

      y += fullRenglon;
    }
    fontIdx++;
  };

  const drawTrazos = () => {
    const trazosHeight = isCuadricula ? bandHeight : fullRenglon;
    if (y + trazosHeight > H - 40) return;

    // Trazos siempre usan un estilo base sutil
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const bx = mx + i * 70;
      ctx.moveTo(bx, y + trazosHeight);
      ctx.bezierCurveTo(bx + 10, y, bx + 30, y, bx + 35, y + trazosHeight / 2);
      ctx.bezierCurveTo(bx + 40, y + trazosHeight, bx + 60, y + trazosHeight, bx + 70, y + trazosHeight / 2);
    }
    ctx.stroke();

    ctx.fillStyle = "#999";
    ctx.font = `italic 11px Georgia`;
    ctx.fillText("Bucles · Espirales · Trazos libres", mx, y - 5);
    y += trazosHeight + (isCuadricula ? gridGap : 0);
  };

  if (contenido.trazos) drawTrazos();
  if (contenido.vocalesMay) drawRow("Vocales Mayúsculas", "A E I O U");
  if (contenido.vocalesMin) drawRow("Vocales minúsculas", "a e i o u");
  if (contenido.alfabetoMay) drawRow("Alfabeto Mayúsculas", "A B C D E F G H I");
  if (contenido.alfabetoMin) drawRow("Alfabeto minúsculas", "a b c d e f g h i");
  if (contenido.silabas) drawRow("Sílabas", "ma me mi mo mu");
  if (contenido.palabras) drawRow("Palabras", "mamá · papá · sol · casa");
  if (contenido.frases) drawRow("Frase", "Mi mamá me mima.");
  if (contenido.textos) drawRow("Texto", "El sol brilla en el cielo azul.");
}

// ──────────────────────────────────────────────────────────────────────────────
// RENDER DE TEXTO LIBRE EN CANVAS
// ──────────────────────────────────────────────────────────────────────────────

function drawTextoLibre(
  ctx: CanvasRenderingContext2D,
  config: Config
) {
  const { textoLibre, margen, formato, tipoLetra } = config;
  const mx = getMarginX(margen) + 15;
  const rightX = W - 30;

  const selectedFonts = tipoLetra && tipoLetra.length > 0 ? tipoLetra : ["escolar" as TipoLetraVal];

  const isCuadricula = formato === "cuadricula-4" || formato === "cuadricula-5";
  const cellSize = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

  // Altura de renglón según numLineas o sistema Montessori
  const h = 22;
  const gap = 30;
  const numLineas = textoLibre.numLineas;
  
  const hTotalMontessori = h * 3 + gap;

  // Grid mode: calculate band dimensions based on numLineas
  const gridRowsPerText = numLineas <= 8 ? 4 : numLineas <= 12 ? 3 : 2;
  const gridBandHeight = isCuadricula ? cellSize * gridRowsPerText * 5 : 0;
  const gridGap = isCuadricula ? cellSize * Math.max(2, gridRowsPerText) : 0;
  const gridFontSize = isCuadricula ? Math.round(gridBandHeight * 0.35) : 0;
  const gridStartY = 20 + (isCuadricula ? cellSize * 5 : 0);

  const altRenglon = isCuadricula ? gridBandHeight + gridGap : (formato === "pauta-guiada" ? hTotalMontessori : Math.floor((H - 140) / numLineas));
  const fontSize = isCuadricula ? gridFontSize : (formato === "pauta-guiada" ? h * 1.2 : Math.floor(altRenglon * 0.55));

  // Encabezado
  if (textoLibre.enunciado.trim()) {
    ctx.fillStyle = "#1A1A1A";
    ctx.font = `bold ${Math.min(22, fontSize * 0.9)}px Georgia`;
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
  let startY = isCuadricula ? gridStartY : 80;

  if (texto) {
    const maxWidth = rightX - mx - 10;
    // Dividir por líneas explícitas primero
    const paragrafs = texto.split("\n");
    const lineas: string[] = [];

    for (const para of paragrafs) {
      if (!para.trim()) { lineas.push(""); continue; }

      // Mock measure text logic using first font for layout wrapping consistency
      ctx.font = `${fontSize}px Georgia`;

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
    let y = isCuadricula ? startY : startY + altRenglon * 0.75;

    for (const linea of lineas) {
      if (isCuadricula) {
        if (y + gridBandHeight > H - 40) break;
      } else {
        if (y > H - 60) break;
      }

      const currentFontType = selectedFonts[lineIdx % selectedFonts.length];

      const fontBase =
        currentFontType === "massallera" || currentFontType === "massallera-dot" ? "Massallera, Georgia" :
          currentFontType === "escolar" || currentFontType === "escolar-dot" ? "Escolar, Georgia" :
            currentFontType?.startsWith("mestra-pauta") ? "Mestra Pauta, Georgia" :
              currentFontType?.startsWith("mestra-guiada") ? "Mestra Montessori, Georgia" :
                "Georgia";

      const isDottedVersion = !!(
        currentFontType === "escolar-dot" ||
        currentFontType === "mestra-pauta-dot" ||
        currentFontType === "mestra-guiada-dot"
      );

      const isPunteada = !!currentFontType?.includes("-dot");

      const fontToUse = isDottedVersion ?
        (currentFontType === "escolar-dot" ? "Escolar Dot" :
          currentFontType === "mestra-pauta-dot" ? "Mestra Pauta Dot" : "Mestra Montessori Dot")
        : fontBase;

      if (isCuadricula) {
        // Grid mode: snap to grid with highlight band
        const bandTopY = y;
        const baselineY = bandTopY + Math.round(gridBandHeight * 0.78);

        // Highlight band
        ctx.fillStyle = "rgba(255, 243, 224, 0.35)";
        ctx.fillRect(getMarginX(margen), bandTopY, W - getMarginX(margen) - 20, gridBandHeight);

        drawTextWithStyle(
          ctx,
          linea,
          mx,
          baselineY,
          fontToUse,
          gridFontSize,
          isPunteada,
          isDottedVersion
        );

        // Practice line below (if alternating)
        if (lineIdx % 2 === 0 && y + gridBandHeight + gridGap + gridBandHeight < H - 40) {
          y += gridBandHeight + gridGap + gridBandHeight + gridGap; // skip a band for practice
        } else {
          y += gridBandHeight + gridGap;
        }
      } else {
        // Pauta modes: existing logic
        drawTextWithStyle(
          ctx,
          linea,
          mx,
          y,
          fontToUse,
          fontSize,
          isPunteada,
          isDottedVersion
        );

        // Línea punteada para que el alumno escriba debajo (si hay espacio)
        if (lineIdx % 2 === 0 && y + altRenglon < H - 60) {
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
      }

      lineIdx++;
    }
  } else {
    // Placeholder si no hay texto
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.font = `italic ${fontSize}px Georgia`;
    ctx.fillText("Escribe el texto que quieres practicar...", mx, startY + (isCuadricula ? gridBandHeight * 0.5 : altRenglon * 0.75));
  }

  // Pie de página
  if (textoLibre.pieDePageina.trim()) {
    ctx.fillStyle = "#888";
    ctx.font = `italic ${Math.min(14, fontSize * 0.6)}px Georgia`;
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

function drawFontsPreview(
  ctx: CanvasRenderingContext2D,
  config: Config
) {
  const { tipoLetra, margen, formato } = config;
  const selectedFonts = tipoLetra && tipoLetra.length > 0 ? tipoLetra : [];
  if (selectedFonts.length === 0) return;

  const mx = getMarginX(margen) + 15;

  const isCuadricula = formato === "cuadricula-4" || formato === "cuadricula-5";
  const cellSize = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;
  const lineStep = cellSize;

  // Grid mode: proper band sizing
  const gridRowsPerFont = 3;
  const gridBandHeight = isCuadricula ? cellSize * gridRowsPerFont * 5 : 0;
  const gridGap = isCuadricula ? cellSize * 5 : 0;
  const gridFontSize = isCuadricula ? Math.round(gridBandHeight * 0.35) : 0;
  const gridStartY = 20 + (isCuadricula ? cellSize * 5 : 0);

  // Pauta mode row height
  const altRenglon = isCuadricula ? gridBandHeight : (formato === "pauta-guiada" ? 60 : 40);

  let y = isCuadricula ? gridStartY : 100;

  selectedFonts.forEach((fontType, idx) => {
    if (isCuadricula) {
      if (y + gridBandHeight > H - 100) return;
    } else {
      if (y + altRenglon > H - 100) return;
    }

    const fontBase =
      fontType === "massallera" || fontType === "massallera-dot" ? "Massallera, Georgia" :
        fontType === "escolar" || fontType === "escolar-dot" ? "Escolar, Georgia" :
          fontType?.startsWith("mestra-pauta") ? "Mestra Pauta, Georgia" :
            fontType?.startsWith("mestra-guiada") ? "Mestra Montessori, Georgia" :
              "Georgia";

    const isDottedVersion = !!(
      fontType === "escolar-dot" ||
      fontType === "mestra-pauta-dot" ||
      fontType === "mestra-guiada-dot"
    );

    const isPunteada = !!fontType?.includes("-dot");

    const fontToUse = isDottedVersion ?
      (fontType === "escolar-dot" ? "Escolar Dot" :
        fontType === "mestra-pauta-dot" ? "Mestra Pauta Dot" : "Mestra Montessori Dot")
      : fontBase;

    const phrases: Record<string, string> = {
      "massallera": "Letra Massallera",
      "massallera-dot": "Massallera Punteada",
      "escolar": "Letra Escolar",
      "escolar-dot": "Escolar Punteada",
      "mestra-pauta": "Mestra Pauta",
      "mestra-pauta-dot": "Mestra Pauta Dot",
      "mestra-guiada": "Mestra Montessori",
      "mestra-guiada-dot": "Mestra Montessori Dot"
    };

    const label = phrases[fontType as string] || "Muestra";
    const specificText = config.previewTexts[fontType as string] || "Caligrafíate";

    if (isCuadricula) {
      // Grid mode: snap to grid
      const bandTopY = y;
      const baselineY = bandTopY + Math.round(gridBandHeight * 0.78);

      // Highlight band
      ctx.fillStyle = "rgba(255, 243, 224, 0.35)";
      ctx.fillRect(getMarginX(margen), bandTopY, W - getMarginX(margen) - 20, gridBandHeight);

      // Label
      ctx.fillStyle = "#999";
      ctx.font = `italic 13px Georgia`;
      ctx.fillText(`${idx + 1}. ${label}`, mx, bandTopY - 4);

      drawTextWithStyle(
        ctx,
        specificText,
        mx,
        baselineY,
        fontToUse,
        gridFontSize,
        isPunteada,
        isDottedVersion,
        "rgba(14, 100, 200, 0.4)"
      );

      y += gridBandHeight + gridGap;
    } else {
      // Pauta modes
      ctx.fillStyle = "#999";
      ctx.font = `italic 13px Georgia`;
      ctx.fillText(`${idx + 1}. ${label}`, mx, y - 5);

      drawTextWithStyle(
        ctx,
        specificText,
        mx,
        y + altRenglon * 0.6,
        fontToUse,
        Math.floor(altRenglon * 0.7),
        isPunteada,
        isDottedVersion,
        "rgba(14, 100, 200, 0.4)"
      );

      y += altRenglon + 20;
    }
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

const STEPS = ["Formato", "Márgenes", "Letra", "Contenido", "¡Tu ficha!"];

const defaultConfig: Config = {
  formato: null,
  margen: null,
  margenDibujo: "tren",
  tipoLetra: [],
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
  previewTexts: {},
};

import { SpiralIcon } from "@/components/Icons";

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

  const updatePreviewText = (font: string, text: string) =>
    setConfig((prev) => ({
      ...prev,
      previewTexts: { ...prev.previewTexts, [font]: text },
    }));

  const saveDraft = () => {
    localStorage.setItem("caligra_draft", JSON.stringify(config));
    alert("✨ ¡Borrador guardado correctamente!");
  };

  const loadDraft = () => {
    const saved = localStorage.getItem("caligra_draft");
    if (saved) {
      setConfig(JSON.parse(saved));
      setStep(2); // Ir directamente a la edición
    }
  };

  const toggleTipoLetra = (val: TipoLetraVal) =>
    setConfig((prev) => {
      const current = prev.tipoLetra || [];
      const updated = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
      return { ...prev, tipoLetra: updated };
    });

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
    drawLineasGuia(ctx, config.formato, config.margen, config.margenDibujo);

    if (step === 2) {
      drawFontsPreview(ctx, config);
    } else if (config.modoContenido === "libre") {
      drawTextoLibre(ctx, config);
    } else if (config.modoContenido === "predefinido") {
      drawContenidoSample(ctx, config);
    }

    // Marca de agua sutil renovada - Espiral
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-Math.PI / 8);
    ctx.strokeStyle = "rgba(14,165,233,0.06)";
    ctx.lineWidth = 15; // Espiral gruesa
    ctx.beginPath();
    for (let i = 0; i < 720; i++) {
      const angle = 0.1 * i;
      const x = (1 + angle) * Math.cos(angle) * 5;
      const y = (1 + angle) * Math.sin(angle) * 5;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = "rgba(14,165,233,0.08)";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Caligra-Fiate", 0, 50);
    ctx.restore();
  }, [config, step]);

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
    if (step === 2) return config.tipoLetra && config.tipoLetra.length > 0;
    if (step === 3) return config.modoContenido !== null && hasAnyContenido;
    return true;
  };

  return (
    <main className={styles.main}>
      {/* HEADER */}
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn} id="back-to-inicio">← Inicio</Link>
        <h1 className={styles.brand}>
          CALIGRA<span className={styles.brandUnder}>-</span>F<span style={{ position: "relative" }}>I<SpiralIcon className="tilde-spiral" /></span>ATE
        </h1>
        <span className={styles.tagline}>El Arte de Escribir con un Toque de Magia ✨</span>
      </header>

      {/* STEPPER */}
      <div className={styles.stepper}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
        {STEPS.map((label, i) => (
          <div key={label} className={styles.stepWrap}>
            <div
              className={`${styles.stepDot} ${i < step ? styles.dotDone : ""} ${i === step ? styles.dotActive : ""}`}
              onClick={() => i < step && setStep(i)}
              role={i < step ? "button" : undefined}
              title={i < step ? `Ir al paso ${i + 1}` : undefined}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`${styles.stepLabel} ${i === step ? styles.labelActive : ""}`}>{label}</span>
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
                      { val: "pauta-guiada", icon: "📏", label: "Pauta Montessori", sub: "4 líneas (3 carriles: cielo, camino y tierra)" },
                      { val: "pauta-normal", icon: "📄", label: "Pauta normal", sub: "2 líneas horizontales por renglón" },
                      { val: "cuadricula-5", icon: "/icon-cuadricula-5.svg", label: "Cuadrícula 5mm", sub: "Integrada en cuadrícula de 5mm" },
                      { val: "cuadricula-4", icon: "/icon-cuadricula-4.svg", label: "Cuadrícula 4mm", sub: "Integrada en cuadrícula de 4mm" },
                    ] as const
                  ).map(({ val, icon, label, sub }) => (
                    <button
                      key={val}
                      className={`${styles.optionCard} ${config.formato === val ? styles.optionSelected : ""}`}
                      onClick={() => updateConfig("formato", val)}
                    >
                      <span className={styles.optionIcon}>
                        {icon.startsWith("/") ? <img src={icon} alt={label} className={styles.optionIconImg} /> : icon}
                      </span>
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
                <p className={styles.stepDesc}>¿Cómo prefieres el margen lateral?</p>
                <div className={styles.optionRow}>
                  {(
                    [
                      { val: "sin", icon: "⛶", label: "Sin margen", sub: "El área de escritura ocupa toda la página" },
                      { val: "con", icon: "📋", label: "Margen clásico", sub: "Línea roja vertical a la izquierda" },
                      { val: "dibujo", icon: MARGEN_ICONS[config.margenDibujo || "tren"], label: "Margen con dibujo", sub: "Un icono guía al inicio de cada línea" },
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

                {config.margen === "dibujo" && (
                  <div className={styles.dibujoSelectWrap}>
                    <label className={styles.dibujoLabel}>Elige tu dibujo favorito:</label>
                    <div className={styles.dibujoGrid}>
                      {(Object.entries(MARGEN_ICONS) as [MargenDibujo, string][]).map(([val, icon]) => (
                        <button
                          key={val}
                          className={`${styles.dibujoBtn} ${config.margenDibujo === val ? styles.dibujoBtnActive : ""}`}
                          onClick={() => updateConfig("margenDibujo", val)}
                        >
                          <span className={styles.dibujoIcon}>{icon}</span>
                          <span className={styles.dibujoName}>
                            {val === "nino" ? "Niño" : (val === "nina" ? "Niña" : (val === "arbol" ? "Árbol" : val.charAt(0).toUpperCase() + val.slice(1)))}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ──── PASO 2: Tipo de Letra ──────────────────────────────────────── */}
            {step === 2 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepNum}>3</span>
                  Tipo de letra
                </h2>
                <p className={styles.stepDesc}>Seleccione el estilo de letra (puedes elegir varias):</p>
                
                {/* LIVE PREVIEW EDITOR - MULTI LINE */}
                <div className={styles.multiPreviewEditor}>
                  <div className={styles.editorHeader}>
                    <label className={styles.previewLabel}>✍️ Personalizar texto por tipo de letra:</label>
                    <button className={styles.saveDraftBtn} onClick={saveDraft} title="Guardar progreso">
                      💾 Guardar borrador
                    </button>
                    <button className={styles.loadDraftBtn} onClick={loadDraft} title="Cargar último guardado">
                      📂 Cargar
                    </button>
                  </div>
                  
                  {config.tipoLetra && config.tipoLetra.length > 0 ? (
                    <div className={styles.previewLinesList}>
                      {config.tipoLetra.map((fontVal, i) => (
                        <div key={fontVal} className={styles.previewLineItem}>
                          <span className={styles.lineNumBadge}>{i + 1}</span>
                          <input 
                            type="text" 
                            className={styles.previewInputSmall}
                            value={config.previewTexts[fontVal] || ""}
                            onChange={(e) => updatePreviewText(fontVal, e.target.value)}
                            placeholder={`Escribe texto para ${fontVal.replace('-', ' ')}...`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noFontsHint}>⚠️ Selecciona primero algún tipo de letra abajo para empezar a editar.</p>
                  )}
                </div>

                <div className={styles.optionGrid}>
                  {(
                    [
                      {
                        val: "massallera",
                        icon: "🏠",
                        label: "1. Massarella",
                        sub: "Letra ligada clásica.",
                        preview: "Caligrafíate",
                        font: "Massallera, Georgia",
                      },
                      {
                        val: "massallera-dot",
                        icon: "✒️",
                        label: "2. Massarella puntuada",
                        sub: "Efecto punteado para calcar.",
                        preview: "Caligrafíate",
                        font: "Massallera, Georgia",
                        isPunteada: true,
                        isSimulated: true,
                      },
                      {
                        val: "escolar",
                        icon: "🎒",
                        label: "3. Escolar",
                        sub: "Letra escolar estándar.",
                        preview: "Caligrafíate",
                        font: "Escolar, Georgia",
                      },
                      {
                        val: "escolar-dot",
                        icon: "✒️",
                        label: "4. Escolar punteada",
                        sub: "Escolar con puntos de guía.",
                        preview: "Caligrafíate",
                        font: "Escolar Dot, Georgia",
                        isPunteada: true,
                      },
                      {
                        val: "mestra-pauta",
                        icon: "📏",
                        label: "5. Mestra pauta normal",
                        sub: "Pauta horizontal simple.",
                        preview: "Caligrafíate",
                        font: "Mestra Pauta, Georgia",
                      },
                      {
                        val: "mestra-pauta-dot",
                        icon: "✒️",
                        label: "6. Mestra punteada pauta normal",
                        sub: "Pauta simple punteada.",
                        preview: "Caligrafíate",
                        font: "Mestra Pauta Dot, Georgia",
                        isPunteada: true,
                      },
                      {
                        val: "mestra-guiada",
                        icon: "📐",
                        label: "7. Mestra pauta guiada",
                        sub: "Pauta Montessori.",
                        preview: "Caligrafíate",
                        font: "Mestra Montessori, Georgia",
                      },
                      {
                        val: "mestra-guiada-dot",
                        icon: "✒️",
                        label: "8. Mestra punteada pauta guiada",
                        sub: "Montessori punteada.",
                        preview: "Caligrafíate",
                        font: "Mestra Montessori Dot, Georgia",
                        isPunteada: true,
                      },
                    ] as const
                  ).map(({ val, icon, label, sub, preview, font, isPunteada, isSimulated }: any) => (
                    <button
                      key={val}
                      className={`${styles.optionCard} ${config.tipoLetra?.includes(val) ? styles.optionSelected : ""}`}
                      onClick={() => toggleTipoLetra(val)}
                    >
                      <span className={styles.optionIcon}>{icon}</span>
                      <strong>{label}</strong>
                      <span className={styles.optionSub}>{sub}</span>
                      <span 
                        className={isSimulated ? styles.letterPreviewSimulated : (isPunteada ? styles.letterPreviewDotted : styles.letterPreview)} 
                        style={{ fontFamily: font }}
                      >
                        {preview}
                      </span>
                      {config.tipoLetra?.includes(val) && <span className={styles.badgeCount}>{config.tipoLetra.indexOf(val) + 1}</span>}
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
                        <span className={styles.modoIcon}>🖋️</span>
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
                  <span>⬛ Margen: {config.margen === "sin" ? "Escritura completa" : (config.margen === "con" ? "Línea roja" : (config.margen === "dibujo" ? `Dibujo de ${config.margenDibujo === "nino" ? "niño" : (config.margenDibujo === "nina" ? "niña" : (config.margenDibujo === "arbol" ? "árbol" : config.margenDibujo))}` : "—"))}</span>
                  <span>✍️ {config.tipoLetra && config.tipoLetra.length > 0 ? `${config.tipoLetra.length} tipos de letra` : "Sin selección"}</span>
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
                  <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                    <button onClick={descargarPng} className={styles.downloadBtn} id="btn-descargar-png">
                      🖼️ PNG
                    </button>
                    <button
                      onClick={descargarPdf}
                      className={`${styles.downloadBtn} ${styles.downloadBtnPdf}`}
                      disabled={isGeneratingPdf}
                      id="btn-descargar-pdf"
                    >
                      {isGeneratingPdf ? "⏳ ..." : "📄 PDF"}
                    </button>
                    <button
                      onClick={() => { setConfig(defaultConfig); setStep(0); }}
                      className={styles.resetBtn}
                    >
                      🔄 Nueva
                    </button>
                  </div>
                </div>

                <div style={{
                  marginTop: "1.5rem",
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, #fff7ed 0%, #fce7f3 100%)",
                  borderRadius: "12px",
                  border: "2px solid var(--color-cta)",
                  textAlign: "center"
                }}>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem", fontWeight: 600 }}>
                    ¿Prefieres algo más rápido y simple?
                  </p>
                  <Link href="/generador" style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    background: "var(--color-cta)",
                    color: "white",
                    borderRadius: "50px",
                    fontWeight: 800,
                    textDecoration: "none",
                    border: "2px solid #1A1A1A",
                    boxShadow: "4px 4px 0 #1a1a1a",
                    fontSize: "0.85rem",
                    transition: "transform 0.1s ease"
                  }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
                    Ir al generador libre →
                  </Link>
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
