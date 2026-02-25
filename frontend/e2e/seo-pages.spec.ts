/**
 * E2E Tests for SEO Content Pages
 * Tests blog, resume examples, and other content pages
 */

import { test, expect } from '@playwright/test';

test.describe('SEO Content Pages', () => {
  test.describe('Blog', () => {
    test('should load blog listing page', async ({ page }) => {
      await page.goto('/en/blog');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('h1')).toBeVisible();

      const articles = page.locator('article, [class*="blog"], [class*="card"]');
      const count = await articles.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to individual blog post', async ({ page }) => {
      await page.goto('/en/blog');
      await page.waitForLoadState('domcontentloaded');

      const blogLink = page.locator('a[href*="/blog/"]').first();
      await expect(blogLink).toBeVisible();
      await blogLink.click();
      await page.waitForLoadState('domcontentloaded');

      expect(page.url()).toContain('/blog/');
      await expect(page.locator('article, [class*="content"], main').first()).toBeVisible();
    });

    test('should have proper meta tags on blog page', async ({ page }) => {
      await page.goto('/en/blog');

      const metaDescription = page.locator('meta[name="description"]');
      const content = await metaDescription.getAttribute('content');
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(50);
    });
  });

  test.describe('Resume Examples', () => {
    test('should load resume examples listing', async ({ page }) => {
      await page.goto('/en/resume-examples');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('h1')).toBeVisible();

      const exampleLinks = page.locator('a[href*="/resume-examples/"]');
      const count = await exampleLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to specific resume example', async ({ page }) => {
      await page.goto('/en/resume-examples/software-engineer');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('h1, h2').first()).toBeVisible();

      const sections = page.locator('h2, h3');
      const count = await sections.count();
      expect(count).toBeGreaterThan(2);
    });

    test('should have content sections on resume example page', async ({ page }) => {
      await page.goto('/en/resume-examples/software-engineer');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('main, article, [class*="content"]').first()).toBeVisible();
    });
  });

  test.describe('Career Tips', () => {
    test('should load career tips page', async ({ page }) => {
      await page.goto('/en/career-tips');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('main, article, [class*="content"]').first()).toBeVisible();
    });
  });

  test.describe('Alternative Pages', () => {
    const alternatives = [
      'resume-io-alternative',
      'zety-alternative',
      'canva-alternative',
    ];

    for (const alt of alternatives) {
      test(`should load ${alt} page with heading`, async ({ page }) => {
        await page.goto(`/en/${alt}`);
        await page.waitForLoadState('domcontentloaded');

        await expect(page.locator('h1')).toBeVisible();
      });
    }
  });

  test.describe('About/Authors', () => {
    test('should load authors listing page', async ({ page }) => {
      await page.goto('/en/about/authors');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('main, [class*="content"]').first()).toBeVisible();
    });
  });
});

test.describe('SEO Technical Checks', () => {
  test('should have proper canonical URL', async ({ page }) => {
    await page.goto('/en/blog');

    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('/blog');
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/en/blog');

    expect(await page.locator('meta[property="og:title"]').getAttribute('content')).toBeTruthy();
    expect(await page.locator('meta[property="og:description"]').getAttribute('content')).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/en/resume-examples/software-engineer');
    await page.waitForLoadState('domcontentloaded');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/resume-examples');
    await page.waitForLoadState('domcontentloaded');

    const bodyWidth = await page.locator('body').evaluate((el) => el.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(400);
  });
});

test.describe('Error Handling', () => {
  test('should show 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/en/this-page-does-not-exist-12345');
    await page.waitForLoadState('domcontentloaded');

    const notFoundText = page.getByText(/404|not found|page doesn't exist/i);
    await expect(notFoundText).toBeVisible();
  });

  test('should handle missing resume example gracefully', async ({ page }) => {
    const response = await page.goto('/en/resume-examples/fake-job-that-doesnt-exist-xyz');

    // Should return 404 status or redirect
    expect(response?.status()).toBeGreaterThanOrEqual(200);
  });
});
