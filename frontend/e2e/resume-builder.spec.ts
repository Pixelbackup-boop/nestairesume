/**
 * E2E Test: Resume Builder Full Flow
 * Tests the complete resume creation and download journey
 */

import { test, expect } from '@playwright/test';

test.describe('Resume Builder Complete Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  // ==================== Builder Page Load ====================
  test.describe('Builder Page', () => {
    test('should load builder page successfully', async ({ page }) => {
      await page.goto('/en/builder');
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/.*builder/);
    });

    test('should display form inputs', async ({ page }) => {
      await page.goto('/en/builder');
      await page.waitForLoadState('domcontentloaded');

      const inputs = await page.locator('input').all();
      const textareas = await page.locator('textarea').all();
      expect(inputs.length + textareas.length).toBeGreaterThan(0);
    });
  });

  // ==================== Personal Information ====================
  test.describe('Personal Information Form', () => {
    test('should have text input fields', async ({ page }) => {
      await page.goto('/en/builder');
      await page.waitForLoadState('domcontentloaded');

      const textInputs = await page.locator('input[type="text"]').all();
      expect(textInputs.length).toBeGreaterThan(0);
    });

    test('should allow filling personal information', async ({ page }) => {
      await page.goto('/en/builder');
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
      await page.goto('/en/templates');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.getByText(/template/i).first()).toBeVisible();
    });
  });

  // ==================== Download Flow ====================
  test.describe('PDF Download', () => {
    test('should have download button on builder', async ({ page }) => {
      await page.goto('/en/builder');
      await page.waitForLoadState('domcontentloaded');

      const downloadButton = page.getByRole('button', { name: /download|export|save|pdf/i }).first();
      await expect(downloadButton).toBeVisible();
    });

    test('download button should be enabled for filled resume', async ({ page }) => {
      await page.goto('/en/builder');
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
      await page.goto('/en/builder');
      await page.waitForLoadState('domcontentloaded');

      const input = page.locator('input[type="text"]').first();
      await expect(input).toBeVisible();
      await input.fill('Persistence Test');

      await page.reload();
      await page.waitForLoadState('domcontentloaded');

      // Zustand persists to localStorage — value should survive reload
      const reloadedInput = page.locator('input[type="text"]').first();
      await expect(reloadedInput).toBeVisible();
      const value = await reloadedInput.inputValue();
      expect(value).toBe('Persistence Test');
    });
  });
});

test.describe('Resume Builder Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/builder');
    await page.waitForLoadState('domcontentloaded');

    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en/builder');
    await page.waitForLoadState('domcontentloaded');

    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en/builder');
    await page.waitForLoadState('domcontentloaded');

    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });
});
