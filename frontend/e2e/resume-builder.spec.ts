/**
 * E2E Test: Resume Builder Full Flow
 * Tests the complete resume creation and download journey
 */

import { test, expect } from '@playwright/test';

test.describe('Resume Builder Complete Flow @requires-backend', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  // ==================== Builder Page Load ====================
  test.describe('Builder Page', () => {
    test('should load builder page successfully', async ({ page }) => {
      await page.goto('/builder');
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/.*builder/);
    });

    test('should display form inputs', async ({ page }) => {
      await page.goto('/builder');

      // Wait for Suspense + useEffect chains to settle — use visible text input (not hidden file input)
      await page.locator('input:visible').first().waitFor({ timeout: 15000 });

      const inputs = await page.locator('input').all();
      const textareas = await page.locator('textarea').all();
      expect(inputs.length + textareas.length).toBeGreaterThan(0);
    });
  });

  // ==================== Personal Information ====================
  test.describe('Personal Information Form', () => {
    test('should have text input fields', async ({ page }) => {
      await page.goto('/builder');

      // Wait for PersonalForm to hydrate from Zustand store
      await page.locator('input:visible').first().waitFor({ timeout: 15000 });

      const textInputs = await page.locator('input[type="text"]').all();
      expect(textInputs.length).toBeGreaterThan(0);
    });

    test('should allow filling personal information', async ({ page }) => {
      await page.goto('/builder');
      await page.waitForLoadState('domcontentloaded');

      const firstInput = page.locator('input[type="text"]').first();
      await expect(firstInput).toBeVisible();
      await firstInput.fill('John Doe');
      await expect(firstInput).toHaveValue('John Doe');
    });
  });

  // ==================== Template Selection ====================
  test.describe('Template Selection', () => {
    test('should show template-related text on templates page', async ({ page }) => {
      await page.goto('/templates');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.getByText(/template/i).first()).toBeVisible();
    });
  });

  // ==================== Download Flow ====================
  test.describe('PDF Download', () => {
    test('should have download button on builder', async ({ page }) => {
      await page.goto('/builder');
      await page.waitForLoadState('domcontentloaded');

      const downloadButton = page.getByRole('button', { name: /download|export|save|pdf/i }).first();
      await expect(downloadButton).toBeVisible();
    });

    test('download button should be enabled for filled resume', async ({ page }) => {
      await page.goto('/builder');
      await page.waitForLoadState('domcontentloaded');

      const nameInput = page.locator('input[type="text"]').first();
      await expect(nameInput).toBeVisible();
      await nameInput.fill('Test User');

      const downloadButton = page.getByRole('button', { name: /download|export|pdf/i }).first();
      await expect(downloadButton).toBeVisible();
      await expect(downloadButton).toBeEnabled();
    });
  });

  // ==================== Resume Persistence ====================
  test.describe('Resume Persistence', () => {
    test('should preserve data after page reload', async ({ page }) => {
      await page.goto('/builder');
      await page.waitForLoadState('domcontentloaded');

      // Wait for form to fully hydrate before filling
      const input = page.locator('input[type="text"]').first();
      await input.waitFor({ state: 'visible', timeout: 15000 });
      await input.fill('Persistence Test');

      // Small delay to let Zustand persist to localStorage
      await page.waitForTimeout(500);

      await page.reload();
      await page.waitForLoadState('domcontentloaded');

      // Wait for Zustand to rehydrate from localStorage after reload
      const reloadedInput = page.locator('input[type="text"]').first();
      await reloadedInput.waitFor({ state: 'visible', timeout: 15000 });

      // Zustand rehydration may take a tick — poll for the value
      await expect(async () => {
        const value = await reloadedInput.inputValue();
        expect(value).toBe('Persistence Test');
      }).toPass({ timeout: 10000 });
    });
  });
});

test.describe('Resume Builder Responsive Design @requires-backend', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/builder');
    await page.waitForLoadState('domcontentloaded');

    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/builder');
    await page.waitForLoadState('domcontentloaded');

    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/builder');
    await page.waitForLoadState('domcontentloaded');

    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });
});
