import { CANVAS_WIDTH, CANVAS_HEIGHT, Formato, Margen } from './types';

export { CANVAS_WIDTH, CANVAS_HEIGHT } from './types';
export type { Formato, Margen } from './types';

export interface CanvasContext {
  clearRect: (x: number, y: number, w: number, h: number) => void;
  fillStyle: string;
  fillRect: (x: number, y: number, w: number, h: number) => void;
  strokeStyle: string;
  lineWidth: number;
  strokeRect: (x: number, y: number, w: number, h: number) => void;
  beginPath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
}

export function drawLineasGuia(
  ctx: CanvasContext,
  formato: Formato,
  margen: Margen,
  width: number = CANVAS_WIDTH,
  height: number = CANVAS_HEIGHT
) {
  const mx = margen === "con" ? 60 : 20;
  const lineStep = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(mx, 20, width - mx - 20, height - 40);

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
  } else {
    const altRenglon = formato === "pauta-guiada" ? 60 : 40;
    let y = 80;
    while (y + altRenglon < height - 30) {
      if (formato === "pauta-guiada") {
        ctx.strokeStyle = "#B3D1F7";
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(mx, y - 20); ctx.lineTo(width - 20, y - 20); ctx.stroke();
        ctx.strokeStyle = "#7FB3EB";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(width - 20, y); ctx.stroke();
        ctx.strokeStyle = "#B3D1F7";
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(mx, y + 20); ctx.lineTo(width - 20, y + 20); ctx.stroke();
      } else {
        ctx.strokeStyle = "#7FB3EB";
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(width - 20, y); ctx.stroke();
        ctx.strokeStyle = "#D0E6FF";
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(mx, y - (altRenglon / 2)); ctx.lineTo(width - 20, y - (altRenglon / 2)); ctx.stroke();
      }
      y += altRenglon;
    }
  }

  if (margen === "con") {
    ctx.strokeStyle = "#FF9999";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(mx, 20); ctx.lineTo(mx, height - 20); ctx.stroke();
  }

  ctx.strokeStyle = "#1A1A1A";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, width - 20, height - 20);
}
