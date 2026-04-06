import { vi } from 'vitest';

export const mockQRCode = vi.fn().mockResolvedValue('data:image/png;base64,mockqrcode');

export function resetQRMocks() {
  mockQRCode.mockClear();
}
