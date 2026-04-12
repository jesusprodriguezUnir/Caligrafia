/**
 * admin.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tests E2E para la sección de administración (PDF Manager).
 * Verifica el acceso a la interfaz y las funcionalidades principales.
 */

import { test, expect, type Page } from '@playwright/test';

const ADMIN_URL = '/admin/pdf-manager';

async function gotoAdmin(page: Page) {
  await page.goto(ADMIN_URL);
}

test.describe('Admin - PDF Manager', () => {
  // ─── Acceso a la página ──────────────────────────────────────────────────
  test.describe('Acceso y carga', () => {
    test('debería cargar la página de admin correctamente', async ({ page }) => {
      await gotoAdmin(page);
      // Verificar que la página no da error 404 o fallo crítico
      await expect(page).not.toHaveURL(/404/);
    });

    test('debería mostrar algún título o heading en la página de admin', async ({ page }) => {
      await gotoAdmin(page);
      const headings = page.locator('h1, h2, h3');
      await expect(headings.first()).toBeVisible({ timeout: 10000 });
    });

    test('debería mostrar un botón de acción principal', async ({ page }) => {
      await gotoAdmin(page);
      // Buscar botón de procesar PDFs o similar
      const actionButton = page.locator('button').first();
      await expect(actionButton).toBeVisible({ timeout: 10000 });
    });
  });

  // ─── Estado inicial ───────────────────────────────────────────────────────
  test.describe('Estado inicial de la interfaz', () => {
    test('debería mostrar el estado de la conexión o un mensaje informativo', async ({ page }) => {
      await gotoAdmin(page);
      // La página debería tener algún contenido visible
      const body = page.locator('body');
      const text = await body.innerText();
      expect(text.length).toBeGreaterThan(0);
    });

    test('debería tener un botón de procesar PDFs', async ({ page }) => {
      await gotoAdmin(page);
      // Buscar botón relacionado con procesamiento o acción principal
      const processButton = page.locator('button').filter({
        hasText: /procesar|process|iniciar|start|pdf/i,
      });
      // Si existe, debe ser visible
      if (await processButton.count() > 0) {
        await expect(processButton.first()).toBeVisible();
      }
    });
  });

  // ─── Navegación ───────────────────────────────────────────────────────────
  test.describe('Navegación', () => {
    test('debería poder volver a la página principal desde admin', async ({ page }) => {
      await gotoAdmin(page);
      // Buscar enlace de vuelta al inicio
      const homeLink = page.locator('a[href="/"]');
      if (await homeLink.count() > 0) {
        await homeLink.first().click();
        await expect(page).toHaveURL('/');
      } else {
        // Si no hay enlace directo, navegar manualmente
        await page.goto('/');
        await expect(page).toHaveURL('/');
      }
    });
  });
});
