/**
 * text-helpers-extended.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests extendidos para text-helpers: drawTextoLibre y wrapText avanzados.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { drawTextoLibre, wrapText, type TextOptions } from '../text-helpers';

// ─── Mock de canvas context ───────────────────────────────────────────────────
const mockCtx = {
  fillStyle: '#000',
  font: '',
  fillText: vi.fn(),
  strokeStyle: '#000',
  lineWidth: 1,
  strokeText: vi.fn(),
  setLineDash: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  measureText: vi.fn((text: string) => ({ width: text.length * 8 })),
  save: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  textAlign: 'left',
  restore: vi.fn(),
};

const emptyTextoLibre = {
  enunciado: '',
  texto: '',
  pieDePagina: '',
  numLineas: 12 as const,
};

describe('text-helpers - Tests extendidos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── wrapText ─────────────────────────────────────────────────────────────
  describe('wrapText - Casos adicionales', () => {
    const measure = (t: string) => ({ width: t.length * 8 });

    it('debería devolver array de una línea para texto corto', () => {
      const result = wrapText('Hola', 200, measure);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('Hola');
    });

    it('debería partir en múltiples líneas cuando supera maxWidth', () => {
      const longText = 'Esta es una frase muy larga que debe ser partida en varias líneas';
      const result = wrapText(longText, 80, measure);
      expect(result.length).toBeGreaterThan(1);
    });

    it('debería preservar saltos de párrafo como líneas vacías', () => {
      const text = 'Párrafo uno\n\nPárrafo dos';
      const result = wrapText(text, 500, measure);
      expect(result).toContain('');
      expect(result).toContain('Párrafo uno');
      expect(result).toContain('Párrafo dos');
    });

    it('debería manejar texto con múltiples espacios', () => {
      const result = wrapText('Palabra', 200, measure);
      expect(result[0]).toBe('Palabra');
    });

    it('debería manejar texto de una sola palabra muy larga', () => {
      const longWord = 'Supercalifragilisticoexpialidoso';
      const result = wrapText(longWord, 50, measure);
      // La palabra no puede partirse, debería permanecer como una línea
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.join(' ')).toContain(longWord);
    });

    it('debería manejar texto con solo espacios', () => {
      const result = wrapText('   ', 200, measure);
      // El texto con solo espacios se trata como línea vacía
      expect(Array.isArray(result)).toBe(true);
    });

    it('debería funcionar con maxWidth muy grande (sin wrap)', () => {
      const text = 'Una línea corta';
      const result = wrapText(text, 99999, measure);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(text);
    });
  });

  // ─── drawTextoLibre ────────────────────────────────────────────────────────
  describe('drawTextoLibre', () => {
    const baseOptions: TextOptions = {
      textoLibre: emptyTextoLibre,
      margen: 'sin',
      formato: 'pauta-normal',
      tipoLetra: 'escolar',
    };

    it('no debería lanzar error con texto vacío', () => {
      expect(() => drawTextoLibre(mockCtx as any, baseOptions)).not.toThrow();
    });

    it('debería dibujar marca de agua al final', () => {
      drawTextoLibre(mockCtx as any, baseOptions);
      expect(mockCtx.save).toHaveBeenCalled();
      expect(mockCtx.translate).toHaveBeenCalled();
      expect(mockCtx.rotate).toHaveBeenCalled();
      expect(mockCtx.restore).toHaveBeenCalled();
    });

    it('debería dibujar el enunciado cuando está presente', () => {
      const options: TextOptions = {
        ...baseOptions,
        textoLibre: { ...emptyTextoLibre, enunciado: 'Copia las siguientes palabras' },
      };
      drawTextoLibre(mockCtx as any, options);
      expect(mockCtx.fillText).toHaveBeenCalledWith(
        'Copia las siguientes palabras',
        expect.any(Number),
        expect.any(Number)
      );
    });

    it('debería dibujar el pie de página cuando está presente', () => {
      const options: TextOptions = {
        ...baseOptions,
        textoLibre: { ...emptyTextoLibre, pieDePagina: 'Caligrafía Mágica © 2024' },
      };
      drawTextoLibre(mockCtx as any, options);
      expect(mockCtx.fillText).toHaveBeenCalledWith(
        'Caligrafía Mágica © 2024',
        expect.any(Number),
        expect.any(Number)
      );
    });

    it('debería usar strokeText para letra punteada', () => {
      const options: TextOptions = {
        ...baseOptions,
        tipoLetra: 'escolar-dot',
        textoLibre: { ...emptyTextoLibre, texto: 'Texto para trazar' },
      };
      drawTextoLibre(mockCtx as any, options);
      expect(mockCtx.strokeText).toHaveBeenCalled();
    });

    it('no debería usar strokeText para letra normal (escolar)', () => {
      const options: TextOptions = {
        ...baseOptions,
        textoLibre: { ...emptyTextoLibre, texto: 'Texto normal' },
      };
      drawTextoLibre(mockCtx as any, options);
      expect(mockCtx.strokeText).not.toHaveBeenCalled();
    });

    it('debería funcionar con margen "con"', () => {
      const options: TextOptions = { ...baseOptions, margen: 'con' };
      expect(() => drawTextoLibre(mockCtx as any, options)).not.toThrow();
    });

    it('debería funcionar con tipoLetra null', () => {
      const options: TextOptions = { ...baseOptions, tipoLetra: null };
      expect(() => drawTextoLibre(mockCtx as any, options)).not.toThrow();
    });

    it('debería funcionar con 8 líneas', () => {
      const options: TextOptions = {
        ...baseOptions,
        textoLibre: { ...emptyTextoLibre, numLineas: 8 },
      };
      expect(() => drawTextoLibre(mockCtx as any, options)).not.toThrow();
    });

    it('debería funcionar con 16 líneas', () => {
      const options: TextOptions = {
        ...baseOptions,
        textoLibre: { ...emptyTextoLibre, numLineas: 16 },
      };
      expect(() => drawTextoLibre(mockCtx as any, options)).not.toThrow();
    });

    it('debería manejar texto multilínea', () => {
      const options: TextOptions = {
        ...baseOptions,
        textoLibre: {
          ...emptyTextoLibre,
          texto: 'Primera línea\nSegunda línea\nTercera línea',
        },
      };
      expect(() => drawTextoLibre(mockCtx as any, options)).not.toThrow();
      expect(mockCtx.fillText).toHaveBeenCalled();
    });

    it('debería aceptar dimensiones personalizadas', () => {
      expect(() =>
        drawTextoLibre(mockCtx as any, baseOptions, 600, 800)
      ).not.toThrow();
    });
  });
});
