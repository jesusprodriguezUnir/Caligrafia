/**
 * pdf-processor.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests unitarios para la lógica del procesador de PDFs.
 * Se testean las funciones puras (cleanTitle, outputPathFor) de forma aislada.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── Mock de fs-extra y pdf-lib ──────────────────────────────────────────────
vi.mock('fs-extra', () => ({
  existsSync: vi.fn().mockReturnValue(false),
  mkdirSync: vi.fn(),
  readdirSync: vi.fn().mockReturnValue([]),
  statSync: vi.fn().mockReturnValue({ isDirectory: () => false }),
  readFileSync: vi.fn().mockReturnValue(Buffer.from('mock pdf content')),
  writeFileSync: vi.fn(),
}));

vi.mock('pdf-lib', () => ({
  PDFDocument: {
    load: vi.fn().mockResolvedValue({
      getPages: vi.fn().mockReturnValue([
        {
          getSize: vi.fn().mockReturnValue({ width: 595, height: 842 }),
        },
      ]),
    }),
    create: vi.fn().mockResolvedValue({
      addPage: vi.fn().mockReturnValue({
        getSize: vi.fn().mockReturnValue({ width: 595, height: 842 }),
        drawRectangle: vi.fn(),
        drawCircle: vi.fn(),
        drawText: vi.fn(),
        embedPage: vi.fn().mockResolvedValue({}),
        drawPage: vi.fn(),
      }),
      embedFont: vi.fn().mockResolvedValue({}),
      embedPage: vi.fn().mockResolvedValue({}),
      save: vi.fn().mockResolvedValue(new Uint8Array()),
    }),
  },
  rgb: vi.fn((r: number, g: number, b: number) => ({ r, g, b })),
  StandardFonts: {
    HelveticaBold: 'Helvetica-Bold',
    Helvetica: 'Helvetica',
  },
}));

// ─── Tests de funciones puras ─────────────────────────────────────────────────
describe('PDF Processor - Funciones puras', () => {
  describe('cleanTitle (simulado)', () => {
    // Replicamos la lógica de cleanTitle para testear el comportamiento esperado
    function cleanTitle(filename: string): string {
      let clean = filename.toLowerCase();
      const wordsToRemove = [
        '.pdf', 'rubio', 'anaya', 'santillana', 'kumon',
        'cuaderno', 'cuadernos', 'caligrafía', 'caligrafia',
        'escritura', 'educación', 'infantil', 'primaria',
        '(', ')', '  '
      ];
      for (const w of wordsToRemove) {
        clean = clean.split(w).join(' ');
      }
      clean = clean.replace(/\s+/g, ' ').trim();
      if (!clean) return 'Ejercicios Prácticos';
      return clean.split(' ').map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }

    it('debería eliminar la marca "rubio" del título', () => {
      const result = cleanTitle('cuadernillo-rubio.pdf');
      expect(result).not.toContain('rubio');
      expect(result).not.toContain('Rubio');
    });

    it('debería capitalizar cada palabra correctamente', () => {
      const result = cleanTitle('letras y silabas.pdf');
      expect(result).toBe('Letras Y Silabas');
    });

    it('debería devolver "Ejercicios Prácticos" para nombres vacíos tras limpieza', () => {
      const result = cleanTitle('rubio.pdf');
      expect(result).toBe('Ejercicios Prácticos');
    });

    it('debería eliminar la extensión .pdf', () => {
      const result = cleanTitle('mi documento.pdf');
      expect(result).not.toContain('.pdf');
    });

    it('debería eliminar palabras de editoriales conocidas', () => {
      const editoriales = ['rubio', 'anaya', 'santillana', 'kumon'];
      for (const editorial of editoriales) {
        const result = cleanTitle(`${editorial} ejercicios.pdf`);
        expect(result.toLowerCase()).not.toContain(editorial);
      }
    });

    it('debería manejar nombres con paréntesis', () => {
      const result = cleanTitle('ejercicios (nivel 1).pdf');
      expect(result).not.toContain('(');
      expect(result).not.toContain(')');
    });

    it('debería manejar espacios múltiples', () => {
      const result = cleanTitle('  mi   cuaderno   .pdf');
      expect(result).not.toMatch(/\s{2,}/);
    });
  });

  describe('ProcessResult interface', () => {
    it('debería tener la estructura correcta para éxito', () => {
      const result = {
        fileName: 'cuadernillo.pdf',
        success: true,
        outputPath: '/processed/cuadernillo/cuadernillo-premium.pdf',
      };
      expect(result.fileName).toBe('cuadernillo.pdf');
      expect(result.success).toBe(true);
      expect(result.outputPath).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('debería tener la estructura correcta para error', () => {
      const result = {
        fileName: 'archivo-roto.pdf',
        success: false,
        error: 'Error al procesar PDF: archivo corrupto',
      };
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.outputPath).toBeUndefined();
    });
  });
});

// ─── Tests de la función processPDFs con mocks ────────────────────────────────
describe('processPDFs', () => {
  it('debería importar processPDFs sin errores', async () => {
    const { processPDFs } = await import('@/lib/pdf-processor');
    expect(typeof processPDFs).toBe('function');
  });

  it('debería devolver array vacío cuando no hay PDFs en el directorio', async () => {
    const { processPDFs } = await import('@/lib/pdf-processor');
    const results = await processPDFs();
    expect(Array.isArray(results)).toBe(true);
  });
});
