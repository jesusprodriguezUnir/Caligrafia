import { CANVAS_WIDTH, CANVAS_HEIGHT, Formato, Margen, MargenDibujo } from './types';

export { CANVAS_WIDTH, CANVAS_HEIGHT } from './types';
export type { Formato, Margen, MargenDibujo } from './types';

export interface CanvasContext {
  clearRect: (x: number, y: number, w: number, h: number) => void;
  fillStyle: string | CanvasGradient | CanvasPattern;
  fillRect: (x: number, y: number, w: number, h: number) => void;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  lineWidth: number;
  strokeRect: (x: number, y: number, w: number, h: number) => void;
  beginPath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  fillText: (text: string, x: number, y: number) => void;
  save: () => void;
  restore: () => void;
  setLineDash: (segments: number[]) => void;
}

export const getMarginX = (margen: Margen): number => {
  if (margen === "sin") return 20;
  if (margen === "con") return 60;
  if (margen === "dibujo") return 85;
  return 20;
};

export const MARGEN_ICONS: Record<MargenDibujo, string> = {
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

export function drawLineasGuia(
  ctx: CanvasContext,
  formato: Formato,
  margen: Margen,
  margenDibujo?: MargenDibujo,
  width: number = CANVAS_WIDTH,
  height: number = CANVAS_HEIGHT
) {
  const mx = getMarginX(margen);
  const lineStep = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  // Fondo sutil para la hoja
  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(mx, 20, width - mx - 20, height - 40);

  const icon = margenDibujo ? MARGEN_ICONS[margenDibujo] : "";

  if (formato === "cuadricula-4" || formato === "cuadricula-5") {
    ctx.strokeStyle = "#D1E8FF";
    ctx.lineWidth = 0.6;
    for (let x = mx; x <= width - 20; x += lineStep) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, height - 20); ctx.stroke();
    }
    for (let y = 20; y <= height - 20; y += lineStep) {
      ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(width - 20, y); ctx.stroke();
    }
    ctx.strokeStyle = "#A3C4E0";
    ctx.lineWidth = 0.8;
    for (let x = mx; x <= width - 20; x += lineStep * 5) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, height - 20); ctx.stroke();
    }
    for (let y = 20; y <= height - 20; y += lineStep * 5) {
      ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(width - 20, y); ctx.stroke();
    }

    if (margen === "dibujo" && icon) {
      ctx.font = "28px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let gridY = 20; gridY <= height - lineStep * 5; gridY += lineStep * 5) {
        ctx.fillText(icon, mx - 40, gridY + lineStep * 2.5);
      }
    }
  } else {
    // Sistema Montessori (Pisos de las letras: Cielo, Camino, Tierra)
    const h = 22; // Altura de cada piso
    const gap = 30; // Separación entre renglones
    let lineY = 100;

    while (lineY + h * 3 < height - 50) {
      const topY = lineY;
      const midTop = topY + h;
      const midBot = topY + h * 2;
      const botY = topY + h * 3;

      if (formato === "pauta-guiada") {
        // 1. Sombrear zonas (Colores exactos del PDF)
        ctx.fillStyle = "#E0F2FE"; // Cielo (Azul suave)
        ctx.fillRect(mx, topY, width - mx - 20, h);
        // Camino (Blanco - ya está de fondo)
        ctx.fillStyle = "#FFEDD5"; // Tierra (Melocotón/Tan muy suave)
        ctx.fillRect(mx, midBot, width - mx - 20, h);

        // 2. Líneas
        ctx.save();
        ctx.lineWidth = 1;
        // Línea 1 (Cielo) - Cian sólido
        ctx.strokeStyle = "#0EA5E9";
        ctx.beginPath(); ctx.moveTo(mx, topY); ctx.lineTo(width - 20, topY); ctx.stroke();
        // Línea 4 (Tierra) - Marrón sólido
        ctx.strokeStyle = "#92400E";
        ctx.beginPath(); ctx.moveTo(mx, botY); ctx.lineTo(width - 20, botY); ctx.stroke();
        // Líneas 2 y 3 (Camino) - Discontinuas Gris oscuro
        ctx.strokeStyle = "#6B7280";
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(mx, midTop); ctx.lineTo(width - 20, midTop); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx, midBot); ctx.lineTo(width - 20, midBot); ctx.stroke();
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
        ctx.beginPath(); ctx.moveTo(mx, midTop); ctx.lineTo(width - 20, midTop); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx, midBot); ctx.lineTo(width - 20, midBot); ctx.stroke();

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
  ctx.strokeRect(10, 10, width - 20, height - 20);
}
