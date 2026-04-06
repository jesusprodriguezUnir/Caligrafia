import { vi } from 'vitest';

export const mockCanvasContext = {
  clearRect: vi.fn(),
  fillStyle: '',
  fillRect: vi.fn(),
  strokeStyle: '',
  lineWidth: 0,
  strokeRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillText: vi.fn(),
  strokeText: vi.fn(),
  setLineDash: vi.fn(),
  bezierCurveTo: vi.fn(),
  measureText: vi.fn(() => ({ width: 100 })),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  textAlign: 'left',
  fill: vi.fn(),
};

export function createMockCanvas(width: number = 794, height: number = 1123) {
  const ctx = { ...mockCanvasContext };
  
  return {
    width,
    height,
    getContext: vi.fn(() => ctx),
    toDataURL: vi.fn(() => 'data:image/png;base64,mock'),
    toBlob: vi.fn((callback: BlobCallback) => {
      const blob = new Blob(['mock'], { type: 'image/png' });
      callback(blob);
    }),
  };
}

export function resetCanvasMocks() {
  mockCanvasContext.clearRect.mockClear();
  mockCanvasContext.fillRect.mockClear();
  mockCanvasContext.strokeRect.mockClear();
  mockCanvasContext.beginPath.mockClear();
  mockCanvasContext.moveTo.mockClear();
  mockCanvasContext.lineTo.mockClear();
  mockCanvasContext.stroke.mockClear();
  mockCanvasContext.fillText.mockClear();
  mockCanvasContext.strokeText.mockClear();
  mockCanvasContext.setLineDash.mockClear();
  mockCanvasContext.bezierCurveTo.mockClear();
  mockCanvasContext.measureText.mockClear();
  mockCanvasContext.save.mockClear();
  mockCanvasContext.restore.mockClear();
  mockCanvasContext.translate.mockClear();
  mockCanvasContext.rotate.mockClear();
  mockCanvasContext.fill.mockClear();
}
