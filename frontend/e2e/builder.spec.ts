import { test, expect } from '@playwright/test';

test.describe('Resume Builder', () => {
  test.describe('Builder Page Access', () => {
    test('should load builder with form inputs', async ({ page }) => {
      await page.goto('/en/builder');
      await page.waitForLoadState('domcontentloaded');

      await expect(page).toHaveURL(/.*builder/);
      const inputCount = await page.locator('input').count();
      expect(inputCount).toBeGreaterThan(0);
    });
  });

  test.describe('Templates Page', () => {
    test('should display template category links', async ({ page }) => {
      await page.goto('/en/templates');
      await page.waitForLoadState('domcontentloaded');

      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      const templateLinks = page.locator('a[href*="/templates/"]');
      const count = await templateLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to template category', async ({ page }) => {
      await page.goto('/en/templates');
      await page.waitForLoadState('domcontentloaded');

      const firstLink = page.locator('a[href*="/templates/"]').first();
      await expect(firstLink).toBeVisible();
      await firstLink.click();
      await expect(page).toHaveURL(/\/templates\//);
    });
  });

  test.describe('Onboarding Flow', () => {
    test('should display onboarding page with form content', async ({ page }) => {
      await page.goto('/en/onboarding');
      await page.waitForLoadState('domcontentloaded');

      const formContent = page.locator('input, select, button, [class*="template"]').first();
      await expect(formContent).toBeVisible();
    });
  });
});

test.describe('Pricing Page', () => {
  test('should display pricing plans', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByText(/starter|gold|diamond/i).first()).toBeVisible();
  });

  test('should show plan features', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    const features = page.locator('ul li, [class*="feature"]');
    const count = await features.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have subscribe/get-started links', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.waitForLoadState('domcontentloaded');

    const planLinks = page.getByRole('link', { name: /get started|subscribe/i });
    const count = await planLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
