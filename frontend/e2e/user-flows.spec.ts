/**
 * E2E Tests for Critical User Flows
 * Tests complete user journeys through the application
 */

import { test, expect } from '@playwright/test';

test.describe('User Journey: New Visitor', () => {
  test('complete flow: homepage → templates → pricing', async ({ page }) => {
    // Step 1: Land on homepage
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1').first()).toBeVisible();

    // Step 2: Navigate to templates
    await page.goto('/en/templates');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1').first()).toBeVisible();

    // Step 3: Check pricing
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText(/starter|gold|diamond/i).first()).toBeVisible();
  });

  test('complete flow: homepage → builder via CTA', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const ctaButton = page.getByRole('link', { name: /build|start|create|try/i }).first();
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    await page.waitForLoadState('domcontentloaded');

    // CTA leads to onboarding, builder, or auth
    const url = page.url();
    expect(
      url.includes('onboarding') ||
      url.includes('builder') ||
      url.includes('auth') ||
      url.includes('login')
    ).toBe(true);
  });
});

test.describe('User Journey: Template Selection', () => {
  test('should display template categories', async ({ page }) => {
    await page.goto('/en/templates');
    await page.waitForLoadState('domcontentloaded');

    const templateLinks = page.locator('a[href*="/templates/"]');
    const count = await templateLinks.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should navigate to template category page', async ({ page }) => {
    await page.goto('/en/templates');
    await page.waitForLoadState('domcontentloaded');

    const firstLink = page.locator('a[href*="/templates/"]').first();
    await expect(firstLink).toBeVisible();
    await firstLink.click();
    await page.waitForLoadState('domcontentloaded');

    // Should show template previews on category page
    const previews = page.locator('img, [class*="preview"], [class*="template"]');
    const previewCount = await previews.count();
    expect(previewCount).toBeGreaterThan(0);
  });
});

test.describe('User Journey: Pricing to Checkout', () => {
  test('should display plan links on pricing page', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    const planLink = page.getByRole('link', { name: /get started|subscribe|start/i }).first();
    await expect(planLink).toBeVisible();
  });
});

test.describe('Language/Locale Switching', () => {
  test('should load English locale', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/en');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should load Spanish locale', async ({ page }) => {
    await page.goto('/es');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should persist locale in navigation', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    const internalLink = page.locator('a[href^="/en/"]').first();
    await expect(internalLink).toBeVisible();
    await internalLink.click();
    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('/en/');
  });
});

test.describe('Footer Navigation', () => {
  test('should have footer links', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have privacy or terms link in footer', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const legalLink = page.locator('footer').getByRole('link', { name: /privacy|terms/i }).first();
    await expect(legalLink).toBeVisible();
  });
});

test.describe('Performance & Loading', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(10000);
  });
});
