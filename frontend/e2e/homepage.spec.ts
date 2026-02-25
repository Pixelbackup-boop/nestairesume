import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage with title and heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Resume/i);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should have visible navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav, header').first()).toBeVisible();
  });

  test('should have call-to-action button', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /build|start|create|try/i }).first();
    await expect(cta).toBeVisible();
  });

  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate to templates page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const templatesLink = page.getByRole('link', { name: /template/i }).first();
    await expect(templatesLink).toBeVisible();
    await templatesLink.click();
    await expect(page).toHaveURL(/template/i);
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const pricingLink = page.getByRole('link', { name: /pricing/i }).first();
    await expect(pricingLink).toBeVisible();
    await pricingLink.click();
    await expect(page).toHaveURL(/pricing/i);
  });
});
