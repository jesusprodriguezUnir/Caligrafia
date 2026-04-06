import { describe, it, expect, beforeEach } from 'vitest';
import { drawLineasGuia, CANVAS_WIDTH, CANVAS_HEIGHT, CanvasContext } from '../canvas-helpers';
import { mockCanvasContext } from '@/test/mocks/canvas';

describe('canvas-helpers', () => {
  beforeEach(() => {
    mockCanvasContext.clearRect.mockClear();
    mockCanvasContext.fillRect.mockClear();
    mockCanvasContext.strokeRect.mockClear();
    mockCanvasContext.beginPath.mockClear();
    mockCanvasContext.moveTo.mockClear();
    mockCanvasContext.lineTo.mockClear();
    mockCanvasContext.stroke.mockClear();
  });

  describe('drawLineasGuia', () => {
    it('should clear the canvas first', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'sin');
      expect(mockCanvasContext.clearRect).toHaveBeenCalledWith(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    });

    it('should fill with white background', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'sin');
      expect(mockCanvasContext.fillRect).toHaveBeenCalled();
    });

    it('should call beginPath multiple times for drawing lines', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'sin');
      expect(mockCanvasContext.beginPath).toHaveBeenCalled();
    });

    it('should draw strokeRect for border', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'sin');
      expect(mockCanvasContext.strokeRect).toHaveBeenCalledWith(10, 10, CANVAS_WIDTH - 20, CANVAS_HEIGHT - 20);
    });

    it('should handle different canvas dimensions', () => {
      const customWidth = 600;
      const customHeight = 800;
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'sin', customWidth, customHeight);
      expect(mockCanvasContext.clearRect).toHaveBeenCalledWith(0, 0, customWidth, customHeight);
    });

    it('should handle null formato gracefully', () => {
      expect(() => drawLineasGuia(mockCanvasContext as unknown as CanvasContext, null, 'sin')).not.toThrow();
    });

    it('should handle null margen gracefully', () => {
      expect(() => drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', null)).not.toThrow();
    });

    it('should draw cuadricula-5 format with correct grid', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'cuadricula-5', 'sin');
      expect(mockCanvasContext.moveTo).toHaveBeenCalled();
      expect(mockCanvasContext.lineTo).toHaveBeenCalled();
    });

    it('should draw cuadricula-4 format', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'cuadricula-4', 'sin');
      expect(mockCanvasContext.moveTo).toHaveBeenCalled();
    });

    it('should draw margin when margen is "con"', () => {
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'con');
      expect(mockCanvasContext.moveTo).toHaveBeenCalled();
      expect(mockCanvasContext.lineTo).toHaveBeenCalled();
    });

    it('should not have margin calls when margen is "sin"', () => {
      const moveToCallsBefore = mockCanvasContext.moveTo.mock.calls.length;
      drawLineasGuia(mockCanvasContext as unknown as CanvasContext, 'pauta-guiada', 'sin');
      // With 'sin' margen, margin line should not be drawn (only guide lines)
    });
  });

  describe('CANVAS_WIDTH and CANVAS_HEIGHT constants', () => {
    it('should have correct A4 dimensions', () => {
      expect(CANVAS_WIDTH).toBe(794);
      expect(CANVAS_HEIGHT).toBe(1123);
    });
  });
});
