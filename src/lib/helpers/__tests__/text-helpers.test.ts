import { describe, it, expect } from 'vitest';
import { wrapText, TextoLibre, TextOptions } from '../text-helpers';

describe('text-helpers', () => {
  describe('wrapText', () => {
    it('should return array with empty string for empty text', () => {
      const result = wrapText('', 100, (t) => ({ width: t.length * 8 }));
      expect(result).toEqual(['']);
    });

    it('should return single line for short text', () => {
      const result = wrapText('Hello', 100, (t) => ({ width: t.length * 8 }));
      expect(result).toEqual(['Hello']);
    });

    it('should wrap long text at maxWidth', () => {
      const longText = 'This is a very long text that should be wrapped';
      const maxWidth = 100;
      const measureFn = (text: string) => ({ width: text.length * 8 });
      
      const result = wrapText(longText, maxWidth, measureFn);
      
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle paragraphs', () => {
      const text = 'First paragraph\n\nSecond paragraph';
      const result = wrapText(text, 200, (t) => ({ width: t.length * 8 }));
      
      expect(result).toContain('First paragraph');
      expect(result).toContain('Second paragraph');
    });

    it('should handle empty paragraphs', () => {
      const text = 'Line 1\n\nLine 2';
      const result = wrapText(text, 200, (t) => ({ width: t.length * 8 }));
      
      expect(result).toContain('');
    });

    it('should handle single character words', () => {
      const text = 'a b c d e';
      const result = wrapText(text, 30, (t) => ({ width: t.length * 8 }));
      
      expect(result).toBeDefined();
    });
  });

  describe('TextoLibre type', () => {
    it('should have correct structure', () => {
      const textoLibre: TextoLibre = {
        enunciado: 'Test enunciado',
        texto: 'Test texto',
        pieDePagina: 'Test pie',
        numLineas: 12,
      };
      
      expect(textoLibre.enunciado).toBe('Test enunciado');
      expect(textoLibre.texto).toBe('Test texto');
      expect(textoLibre.pieDePagina).toBe('Test pie');
      expect(textoLibre.numLineas).toBe(12);
    });

    it('should accept numLineas 8', () => {
      const textoLibre: TextoLibre = { enunciado: '', texto: '', pieDePagina: '', numLineas: 8 };
      expect(textoLibre.numLineas).toBe(8);
    });

    it('should accept numLineas 16', () => {
      const textoLibre: TextoLibre = { enunciado: '', texto: '', pieDePagina: '', numLineas: 16 };
      expect(textoLibre.numLineas).toBe(16);
    });
  });

  describe('TextOptions interface', () => {
    it('should accept valid options', () => {
      const options: TextOptions = {
        textoLibre: {
          enunciado: 'Test',
          texto: 'Test text',
          pieDePagina: '',
          numLineas: 12,
        },
        margen: 'con',
        formato: 'pauta-guiada',
        tipoLetra: 'escolar',
      };
      
      expect(options.margen).toBe('con');
      expect(options.formato).toBe('pauta-guiada');
      expect(options.tipoLetra).toBe('escolar');
    });

    it('should accept null tipoLetra', () => {
      const options: TextOptions = {
        textoLibre: {
          enunciado: '',
          texto: '',
          pieDePagina: '',
          numLineas: 8,
        },
        margen: null,
        formato: null,
        tipoLetra: null,
      };
      
      expect(options.tipoLetra).toBeNull();
    });
  });
});
