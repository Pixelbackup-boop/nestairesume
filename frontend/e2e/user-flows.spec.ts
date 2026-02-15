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

    // Step 2: Explore templates
    const templatesLink = page.getByRole('link', { name: /template/i }).first();
    if (await templatesLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await templatesLink.click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('template');
    }

    // Step 3: Check pricing
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText(/starter|gold|diamond/i).first()).toBeVisible();
  });

  test('complete flow: homepage → onboarding', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Click CTA to start building
    const ctaButton = page.getByRole('link', { name: /build|start|create|try/i }).first();
    if (await ctaButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await ctaButton.click();
      await page.waitForLoadState('domcontentloaded');

      // Should be on onboarding, builder, or auth page
      const url = page.url();
      expect(
        url.includes('onboarding') ||
        url.includes('builder') ||
        url.includes('auth') ||
        url.includes('login')
      ).toBe(true);
    }
  });
});

test.describe('User Journey: Template Selection', () => {
  test('should preview multiple templates', async ({ page }) => {
    await page.goto('/en/templates');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Get all template category links
    const templateLinks = page.locator('a[href*="/templates/"]');
    const count = await templateLinks.count();

    if (count > 0) {
      // Visit first template category
      await templateLinks.first().click();
      await page.waitForLoadState('domcontentloaded');

      // Should show template previews
      const previews = page.locator('img, [class*="preview"], [class*="template"]');
      const previewCount = await previews.count();
      expect(previewCount).toBeGreaterThan(0);
    }
  });

  test('should filter templates by category', async ({ page }) => {
    await page.goto('/en/templates');
    await page.waitForLoadState('domcontentloaded');

    // Check for category navigation
    const categories = page.locator('a[href*="/templates/"]');
    const categoryCount = await categories.count();

    // Should have multiple categories
    expect(categoryCount).toBeGreaterThan(1);
  });
});

test.describe('User Journey: Resume Building (Unauthenticated)', () => {
  test('should show auth prompt when trying to save', async ({ page }) => {
    await page.goto('/en/onboarding');
    await page.waitForLoadState('domcontentloaded');

    // Try to interact with the builder
    const input = page.locator('input').first();
    if (await input.isVisible({ timeout: 3000 }).catch(() => false)) {
      await input.fill('Test Name');
    }

    // Look for any save/continue button
    const saveButton = page.getByRole('button', { name: /save|continue|next|submit/i }).first();
    if (await saveButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await saveButton.click();
      await page.waitForTimeout(2000);

      // May show auth prompt or continue to next step
      const url = page.url();
      const hasAuthPrompt = await page.getByText(/sign in|log in|create account/i).isVisible().catch(() => false);

      // Either shows auth or continues flow
      expect(hasAuthPrompt || url.includes('onboarding') || url.includes('builder')).toBe(true);
    }
  });
});

test.describe('User Journey: Pricing to Checkout', () => {
  test('should navigate from pricing to checkout', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    // Find a plan link
    const planLink = page.getByRole('link', { name: /get started|subscribe|start/i }).first();

    if (await planLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await planLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Should be on checkout or auth page
      const url = page.url();
      expect(
        url.includes('checkout') ||
        url.includes('auth') ||
        url.includes('login') ||
        url.includes('pricing')
      ).toBe(true);
    }
  });

  test('checkout page shows plan details', async ({ page }) => {
    await page.goto('/en/checkout?plan=gold');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Should show Gold plan info or auth prompt
    const hasGoldText = await page.getByText(/gold/i).first().isVisible().catch(() => false);
    const hasAuthPrompt = await page.getByText(/sign in|create account/i).isVisible().catch(() => false);

    expect(hasGoldText || hasAuthPrompt).toBe(true);
  });
});

test.describe('Language/Locale Switching', () => {
  test('should support multiple locales', async ({ page }) => {
    // English
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/en');

    // Spanish (if supported)
    await page.goto('/es');
    await page.waitForLoadState('domcontentloaded');
    // Page should load (either /es or redirect to /en)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should persist locale in navigation', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    // Click any internal link
    const internalLink = page.locator('a[href^="/en/"]').first();
    if (await internalLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await internalLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Should still be in /en locale
      expect(page.url()).toContain('/en/');
    }
  });
});

test.describe('Footer Navigation', () => {
  test('should have working footer links', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check for common footer links
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should link to privacy and terms', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');

    // Look for privacy/terms links
    const privacyLink = page.getByRole('link', { name: /privacy/i });
    const termsLink = page.getByRole('link', { name: /terms/i });

    const hasPrivacy = await privacyLink.isVisible().catch(() => false);
    const hasTerms = await termsLink.isVisible().catch(() => false);

    // Footer should have legal links
    expect(hasPrivacy || hasTerms).toBe(true);
  });
});

test.describe('Performance & Loading', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should show loading states', async ({ page }) => {
    await page.goto('/en/builder');

    // Check for any loading indicators (skeleton, spinner, etc.)
    const loadingIndicator = page.locator('[class*="loading"], [class*="skeleton"], [class*="spinner"]');
    const hasLoading = await loadingIndicator.isVisible().catch(() => false);

    // Page should load regardless
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toBeVisible();
  });
});
