import { test, expect } from '@playwright/test';

test.describe('Resume Builder', () => {
  test.describe('Builder Page Access', () => {
    test('should load builder with form inputs', async ({ page }) => {
      await page.goto('/builder');
      await page.waitForLoadState('domcontentloaded');

      await expect(page).toHaveURL(/.*builder/);
      const inputCount = await page.locator('input').count();
      expect(inputCount).toBeGreaterThan(0);
    });
  });

  test.describe('Templates Page', () => {
    test('should display template cards', async ({ page }) => {
      await page.goto('/templates');
      await page.waitForLoadState('domcontentloaded');

      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();

      // Templates are rendered as clickable div cards in a grid
      const templateCards = page.locator('.group.cursor-pointer');
      await templateCards.first().waitFor({ state: 'visible', timeout: 15000 });
      const count = await templateCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display category filter buttons', async ({ page }) => {
      await page.goto('/templates');
      await page.waitForLoadState('domcontentloaded');

      // Category filters are buttons (all, professional, modern, creative, minimal)
      const filterButtons = page.locator('button').filter({ hasText: /.+/ });
      await filterButtons.first().waitFor({ state: 'visible', timeout: 15000 });
      const count = await filterButtons.count();
      expect(count).toBeGreaterThan(1);
    });
  });

  test.describe('Onboarding Flow', () => {
    test('should display onboarding page with form content', async ({ page }) => {
      await page.goto('/onboarding');
      await page.waitForLoadState('domcontentloaded');

      const formContent = page.locator('input, select, button, [class*="template"]').first();
      await expect(formContent).toBeVisible();
    });
  });
});

test.describe('Pricing Page', () => {
  test('should display pricing plans', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByText(/starter|gold|diamond/i).first()).toBeVisible();
  });

  test('should show plan features', async ({ page }) => {
    await page.goto('/pricing');

    // Wait for plan features to render (loaded via useEffect API call)
    await page.locator('ul li, [class*="feature"]').first().waitFor({ state: 'visible', timeout: 15000 });

    const features = page.locator('ul li, [class*="feature"]');
    const count = await features.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have subscribe/get-started links', async ({ page }) => {
    await page.goto('/pricing');

    // Wait for plan buttons to render (depend on API-loaded plan data)
    await page.getByRole('button', { name: /get started|subscribe/i }).or(page.getByRole('link', { name: /get started|subscribe/i })).first().waitFor({ state: 'visible', timeout: 15000 });

    const planLinks = page.getByRole('button', { name: /get started|subscribe/i }).or(page.getByRole('link', { name: /get started|subscribe/i }));
    const count = await planLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
