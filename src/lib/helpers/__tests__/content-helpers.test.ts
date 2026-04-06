import { describe, it, expect } from 'vitest';
import { contentLabel, Contenido, TipoLetra, DrawOptions } from '../content-helpers';

describe('content-helpers', () => {
  describe('contentLabel', () => {
    it('should return "Sin contenido" when no flags are true', () => {
      const contenido: Contenido = {
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
      expect(contentLabel(contenido)).toBe('Sin contenido');
    });

    it('should return "Trazos libres" when only trazos is true', () => {
      const contenido: Contenido = {
        trazos: true,
        vocalesMay: false,
        vocalesMin: false,
        alfabetoMay: false,
        alfabetoMin: false,
        silabas: false,
        palabras: false,
        frases: false,
        textos: false,
      };
      expect(contentLabel(contenido)).toBe('Trazos libres');
    });

    it('should return all selected content joined by " · "', () => {
      const contenido: Contenido = {
        trazos: true,
        vocalesMay: true,
        vocalesMin: true,
        alfabetoMay: false,
        alfabetoMin: false,
        silabas: false,
        palabras: false,
        frases: false,
        textos: false,
      };
      expect(contentLabel(contenido)).toBe('Trazos libres · Vocales MAYU. · Vocales min.');
    });

    it('should include all content types when all flags are true', () => {
      const contenido: Contenido = {
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
      expect(contentLabel(contenido)).toBe(
        'Trazos libres · Vocales MAYU. · Vocales min. · Abecedario MAYU. · Abecedario min. · Sílabas · Palabras · Frases · Textos'
      );
    });

    it('should return correct label for vocalesMayusculas', () => {
      const contenido: Contenido = { ...getEmptyContenido(), vocalesMay: true };
      expect(contentLabel(contenido)).toContain('Vocales MAYU.');
    });

    it('should return correct label for silabas', () => {
      const contenido: Contenido = { ...getEmptyContenido(), silabas: true };
      expect(contentLabel(contenido)).toContain('Sílabas');
    });

    it('should return correct label for frases', () => {
      const contenido: Contenido = { ...getEmptyContenido(), frases: true };
      expect(contentLabel(contenido)).toContain('Frases');
    });

    it('should return correct label for textos', () => {
      const contenido: Contenido = { ...getEmptyContenido(), textos: true };
      expect(contentLabel(contenido)).toContain('Textos');
    });
  });

  describe('TipoLetra type', () => {
    it('should accept "escolar" as valid', () => {
      const tipo: TipoLetra = 'escolar';
      expect(tipo).toBe('escolar');
    });

    it('should accept "imprenta" as valid', () => {
      const tipo: TipoLetra = 'imprenta';
      expect(tipo).toBe('imprenta');
    });

    it('should accept "punteada" as valid', () => {
      const tipo: TipoLetra = 'punteada';
      expect(tipo).toBe('punteada');
    });

    it('should accept null as valid', () => {
      const tipo: TipoLetra = null;
      expect(tipo).toBeNull();
    });
  });
});

function getEmptyContenido(): Contenido {
  return {
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
}
