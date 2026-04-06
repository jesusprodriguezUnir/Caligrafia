import { vi } from 'vitest';

export const mockSupabaseClient = {
  auth: {
    getSession: vi.fn().mockResolvedValue({
      data: { session: null },
      error: null,
    }),
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { session: null },
      error: null,
    }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
  },
  functions: {
    invoke: vi.fn().mockResolvedValue({
      data: { success: true },
      error: null,
    }),
  },
  storage: {
    from: vi.fn().mockReturnValue({
      download: vi.fn().mockResolvedValue({
        data: null,
        error: null,
      }),
      upload: vi.fn().mockResolvedValue({
        data: null,
        error: null,
      }),
      list: vi.fn().mockResolvedValue({
        data: [],
        error: null,
      }),
    }),
  },
};

export const createMockSupabaseClient = vi.fn(() => mockSupabaseClient);

export function resetSupabaseMocks() {
  mockSupabaseClient.auth.getSession.mockClear();
  mockSupabaseClient.auth.signInWithPassword.mockClear();
  mockSupabaseClient.auth.signOut.mockClear();
  mockSupabaseClient.functions.invoke.mockClear();
}
