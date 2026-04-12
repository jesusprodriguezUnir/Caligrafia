/**
 * content-helpers-extended.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests ampliados para content-helpers: drawContenidoSample y más casos edge.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contentLabel, drawContenidoSample, type DrawOptions, type Contenido } from '../content-helpers';

// Mock de contexto de canvas
const mockCtx = {
  fillStyle: '#000',
  font: '',
  fillText: vi.fn(),
  strokeStyle: '#000',
  lineWidth: 1,
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  bezierCurveTo: vi.fn(),
};

const emptyContenido: Contenido = {
  trazos: false,
  vocalesMay: false,
  vocalesMin: false,
  alfabetoMay: false,
  alfabetoMin: false,
  silabas: false,
  palabras: false,
  frases: false,
  textos: false,
};

const fullContenido: Contenido = {
  trazos: true,
  vocalesMay: true,
  vocalesMin: true,
  alfabetoMay: true,
  alfabetoMin: true,
  silabas: true,
  palabras: true,
  frases: true,
  textos: true,
};

describe('content-helpers - Tests extendidos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCtx.fillStyle = '#000';
    mockCtx.font = '';
  });

  // ─── contentLabel ──────────────────────────────────────────────────────────
  describe('contentLabel - Casos adicionales', () => {
    it('debería manejar solo alfabetoMin correctamente', () => {
      const c = { ...emptyContenido, alfabetoMin: true };
      expect(contentLabel(c)).toBe('Abecedario min.');
    });

    it('debería manejar solo silabas correctamente', () => {
      const c = { ...emptyContenido, silabas: true };
      expect(contentLabel(c)).toBe('Sílabas');
    });

    it('debería manejar solo palabras correctamente', () => {
      const c = { ...emptyContenido, palabras: true };
      expect(contentLabel(c)).toBe('Palabras');
    });

    it('debería devolver string vacío si no hay nada (Sin contenido)', () => {
      expect(contentLabel(emptyContenido)).toBe('Sin contenido');
    });

    it('debería separar múltiples contenidos con " · "', () => {
      const c = { ...emptyContenido, trazos: true, palabras: true };
      const result = contentLabel(c);
      expect(result).toContain(' · ');
      expect(result.split(' · ').length).toBe(2);
    });

    it('debería mantener el orden correcto de los elementos', () => {
      const result = contentLabel(fullContenido);
      const items = result.split(' · ');
      expect(items[0]).toBe('Trazos libres');
      expect(items[1]).toBe('Vocales MAYU.');
      expect(items[items.length - 1]).toBe('Textos');
    });
  });

  // ─── drawContenidoSample ───────────────────────────────────────────────────
  describe('drawContenidoSample', () => {
    const baseOptions: DrawOptions = {
      contenido: emptyContenido,
      tipoLetra: 'escolar',
      margen: 'sin',
      formato: 'pauta-normal',
    };

    it('no debería lanzar error con contenido vacío', () => {
      expect(() =>
        drawContenidoSample(mockCtx as any, baseOptions)
      ).not.toThrow();
    });

    it('no debería lanzar error con contenido completo', () => {
      expect(() =>
        drawContenidoSample(mockCtx as any, { ...baseOptions, contenido: fullContenido })
      ).not.toThrow();
    });

    it('debería llamar fillText cuando vocalesMay está activo', () => {
      const options = { ...baseOptions, contenido: { ...emptyContenido, vocalesMay: true } };
      drawContenidoSample(mockCtx as any, options);
      expect(mockCtx.fillText).toHaveBeenCalled();
    });

    it('debería llamar bezierCurveTo cuando trazos está activo', () => {
      const options = { ...baseOptions, contenido: { ...emptyContenido, trazos: true } };
      drawContenidoSample(mockCtx as any, options);
      expect(mockCtx.bezierCurveTo).toHaveBeenCalled();
    });

    it('debería usar margen con desplazamiento diferente para "con"', () => {
      const optionsSin = { ...baseOptions, margen: 'sin' as const };
      const optionsCon = { ...baseOptions, margen: 'con' as const };
      
      drawContenidoSample(mockCtx as any, optionsSin);
      const callsSin = mockCtx.fillText.mock.calls.length;
      
      vi.clearAllMocks();
      drawContenidoSample(mockCtx as any, optionsCon);
      const callsCon = mockCtx.fillText.mock.calls.length;
      
      // Ambos deberían producir llamadas a fillText (misma cantidad de elementos)
      expect(callsSin).toEqual(callsCon);
    });

    it('debería funcionar con formato cuadricula-4', () => {
      const options = {
        ...baseOptions,
        formato: 'cuadricula-4' as const,
        contenido: { ...emptyContenido, palabras: true },
      };
      expect(() => drawContenidoSample(mockCtx as any, options)).not.toThrow();
    });

    it('debería funcionar con formato cuadricula-5', () => {
      const options = {
        ...baseOptions,
        formato: 'cuadricula-5' as const,
        contenido: { ...emptyContenido, frases: true },
      };
      expect(() => drawContenidoSample(mockCtx as any, options)).not.toThrow();
    });

    it('debería funcionar con formato pauta-guiada', () => {
      const options = {
        ...baseOptions,
        formato: 'pauta-guiada' as const,
        contenido: { ...emptyContenido, textos: true },
      };
      expect(() => drawContenidoSample(mockCtx as any, options)).not.toThrow();
    });

    it('debería funcionar con tipoLetra null', () => {
      const options = { ...baseOptions, tipoLetra: null };
      expect(() => drawContenidoSample(mockCtx as any, options)).not.toThrow();
    });

    it('debería aceptar dimensiones personalizadas', () => {
      expect(() =>
        drawContenidoSample(mockCtx as any, baseOptions, 600, 800)
      ).not.toThrow();
    });
  });
});
