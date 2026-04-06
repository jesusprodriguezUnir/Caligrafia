import { vi } from 'vitest';

export const mockPDFDocument = {
  addPage: vi.fn().mockReturnValue({
    getSize: vi.fn().mockReturnValue({ width: 595.28, height: 841.89 }),
    drawImage: vi.fn(),
  }),
  save: vi.fn().mockResolvedValue(new Uint8Array([37, 80, 68, 70])),
  embedPng: vi.fn().mockResolvedValue({
    width: 794,
    height: 1123,
  }),
};

export const mockPdfLib = {
  PDFDocument: vi.fn().mockImplementation(() => mockPDFDocument),
};

export function resetPdfLibMocks() {
  mockPDFDocument.addPage.mockClear();
  mockPDFDocument.save.mockClear();
  mockPDFDocument.embedPng.mockClear();
}
