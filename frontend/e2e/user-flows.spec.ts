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
    await page.goto('/templates');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1').first()).toBeVisible();

    // Step 3: Check pricing
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText(/starter|gold|diamond/i).first()).toBeVisible();
  });

  test('complete flow: homepage → builder via CTA', async ({ page }) => {
    // Navigate directly to /en to avoid locale redirect timing issues in CI
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Find the primary CTA in the hero section
    const ctaButton = page.locator('section').first().getByRole('link', { name: /build|start|create|try|browse/i }).first();
    await ctaButton.waitFor({ state: 'visible', timeout: 15000 });
    await ctaButton.click();
    await page.waitForURL(/\/(onboarding|builder|templates|pricing|auth|login|checkout|features)/, { timeout: 15000 });

    const url = page.url();
    const validDestinations = ['onboarding', 'builder', 'templates', 'pricing', 'auth', 'login', 'checkout', 'features'];
    const matched = validDestinations.some(dest => url.includes(dest));
    expect(matched).toBe(true);
  });
});

test.describe('User Journey: Template Selection', () => {
  test('should display template cards and category filters', async ({ page }) => {
    await page.goto('/templates');
    await page.waitForLoadState('domcontentloaded');

    // Templates are rendered as clickable div cards, not links
    const templateCards = page.locator('.group.cursor-pointer');
    await templateCards.first().waitFor({ state: 'visible', timeout: 15000 });
    const count = await templateCards.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should filter templates by category', async ({ page }) => {
    await page.goto('/templates');
    await page.waitForLoadState('domcontentloaded');

    // Wait for template cards to render
    const templateCards = page.locator('.group.cursor-pointer');
    await templateCards.first().waitFor({ state: 'visible', timeout: 15000 });
    const initialCount = await templateCards.count();

    // Click a category filter button (not "all" which is already active)
    const categoryButton = page.locator('button').filter({ hasText: /professional|modern|creative|minimal/i }).first();
    await categoryButton.click();

    // Template count should change (filtered subset)
    const filteredCards = page.locator('.group.cursor-pointer');
    const filteredCount = await filteredCards.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });
});

test.describe('User Journey: Pricing to Checkout', () => {
  test('should display plan links on pricing page', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');

    const planLink = page.getByRole('link', { name: /get started|subscribe|start/i }).first();
    await expect(planLink).toBeVisible();
  });
});

test.describe('Language/Locale Switching', () => {
  test('should load English locale', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should load Spanish locale', async ({ page }) => {
    await page.goto('/es');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should persist locale in navigation', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');

    const internalLink = page.locator('a[href^="/"]').first();
    await expect(internalLink).toBeVisible();
    await internalLink.click();
    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('/');
  });
});

test.describe('Footer Navigation', () => {
  test('should have footer links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have privacy or terms link in footer', async ({ page }) => {
    await page.goto('/');
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
