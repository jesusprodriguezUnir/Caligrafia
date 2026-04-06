import { CANVAS_WIDTH, CANVAS_HEIGHT, Formato, Margen, TipoLetra, Contenido } from './types';

export type { TipoLetra, Contenido, Formato, Margen };

export interface ContentContext {
  fillStyle: string;
  font: string;
  fillText: (text: string, x: number, y: number) => void;
  strokeStyle: string;
  lineWidth: number;
  beginPath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
  bezierCurveTo: (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) => void;
}

export function contentLabel(contenido: Contenido): string {
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

export interface DrawOptions {
  contenido: Contenido;
  tipoLetra: TipoLetra;
  margen: Margen;
  formato: Formato;
}

export function drawContenidoSample(
  ctx: ContentContext,
  options: DrawOptions,
  width: number = CANVAS_WIDTH,
  height: number = CANVAS_HEIGHT
) {
  const { contenido, tipoLetra, margen, formato } = options;
  const mx = margen === "con" ? 75 : 30;
  const fontBase = tipoLetra === "escolar" ? "Georgia" : "Arial";

  let y = 100;

  const lineStep =
    formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;
  const altRenglon =
    lineStep > 0 ? lineStep * 4 : formato === "pauta-guiada" ? 60 : 40;

  const drawRow = (label: string, example: string) => {
    if (y + altRenglon > height - 40) return;

    ctx.fillStyle = "#999";
    ctx.font = `italic 13px ${fontBase}`;
    ctx.fillText(label, mx, y - 5);

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.font = `bold ${altRenglon * 0.7}px ${fontBase}`;
    ctx.fillText(example, mx, y + altRenglon * 0.6);

    ctx.strokeStyle = "#E0E0E0";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(mx + measureTextWidth(example, fontBase, altRenglon * 0.7) + 20, y + altRenglon * 0.65);
    ctx.lineTo(width - 30, y + altRenglon * 0.65);
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

function measureTextWidth(text: string, fontFamily: string, fontSize: number): number {
  const estimatedCharWidth = fontSize * 0.6;
  return text.length * estimatedCharWidth;
}
