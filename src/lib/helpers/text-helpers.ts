import { CANVAS_WIDTH, CANVAS_HEIGHT, TextoLibre, TipoLetra } from './types';

export type { TextoLibre };

export interface TextContext {
  fillStyle: string;
  font: string;
  fillText: (text: string, x: number, y: number) => void;
  strokeStyle: string;
  lineWidth: number;
  strokeText: (text: string, x: number, y: number) => void;
  setLineDash: (pattern: number[]) => void;
  beginPath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
  measureText: (text: string) => { width: number };
  save: () => void;
  translate: (x: number, y: number) => void;
  rotate: (angle: number) => void;
  textAlign: string;
  restore: () => void;
}

export interface TextOptions {
  textoLibre: TextoLibre;
  margen: "sin" | "con" | null;
  formato: "pauta-guiada" | "pauta-normal" | "cuadricula-5" | "cuadricula-4" | null;
  tipoLetra: TipoLetra;
}

export function drawTextoLibre(
  ctx: TextContext,
  options: TextOptions,
  width: number = CANVAS_WIDTH,
  height: number = CANVAS_HEIGHT
) {
  const { textoLibre, margen, tipoLetra } = options;
  const mx = margen === "con" ? 75 : 35;
  const rightX = width - 30;
  const fontBase = 
    tipoLetra === "escolar" ? "Georgia, serif" : 
    tipoLetra === "punteada" ? "Georgia, serif" : 
    "Arial, sans-serif";
  const isPunteada = tipoLetra === "punteada";

  const numLineas = textoLibre.numLineas;
  const altRenglon = Math.floor((height - 140) / numLineas);
  const fontSize = Math.floor(altRenglon * 0.55);

  if (textoLibre.enunciado.trim()) {
    ctx.fillStyle = "#1A1A1A";
    ctx.font = `bold ${Math.min(22, fontSize * 0.9)}px ${fontBase}`;
    ctx.fillText(textoLibre.enunciado, mx, 55);
    ctx.strokeStyle = "#0EA5E9";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, 62);
    ctx.lineTo(rightX, 62);
    ctx.stroke();
  }

  const texto = textoLibre.texto.trim();
  let startY = 80;

  if (texto) {
    ctx.font = `${fontSize}px ${fontBase}`;
    const maxWidth = rightX - mx - 10;

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

    let lineIdx = 0;
    let y = startY + altRenglon * 0.75;

    for (const linea of lineas) {
      if (y > height - 60) break;

      if (isPunteada) {
        ctx.strokeStyle = "rgba(14, 100, 200, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 3]);
        ctx.font = `${fontSize}px ${fontBase}`;
        ctx.strokeText(linea, mx, y);
        ctx.setLineDash([]);
      } else {
        ctx.fillStyle = "rgba(14, 100, 200, 0.55)";
        ctx.font = `${fontSize}px ${fontBase}`;
        ctx.fillText(linea, mx, y);
      }

      if (lineIdx % 2 === 0 && y + altRenglon < height - 60) {
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
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.font = `italic ${fontSize}px ${fontBase}`;
    ctx.fillText("Escribe el texto que quieres practicar...", mx, startY + altRenglon * 0.75);
  }

  if (textoLibre.pieDePagina.trim()) {
    ctx.fillStyle = "#888";
    ctx.font = `italic ${Math.min(14, fontSize * 0.6)}px ${fontBase}`;
    ctx.fillText(textoLibre.pieDePagina, mx, height - 30);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(mx, height - 42);
    ctx.lineTo(rightX, height - 42);
    ctx.stroke();
  }

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = "rgba(14,165,233,0.04)";
  ctx.font = "bold 72px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Caligra-Fíate", 0, 0);
  ctx.restore();
}

export function wrapText(text: string, maxWidth: number, measureFn: (text: string) => { width: number }): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");
  
  for (const para of paragraphs) {
    if (!para.trim()) { lines.push(""); continue; }
    
    const words = para.split(" ");
    let currentLine = "";
    
    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      if (measureFn(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  
  return lines;
}
