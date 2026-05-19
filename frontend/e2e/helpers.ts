/**
 * E2E Test Helpers
 * Shared utilities for Playwright tests to reduce duplication
 */

import { Page, expect } from '@playwright/test';

/** Navigate to builder and wait for form inputs to load */
export async function navigateToBuilder(page: Page) {
    await page.goto('/builder');
    await page.waitForLoadState('domcontentloaded');
    // Builder should have at least one input field
    await expect(page.locator('input').first()).toBeVisible();
}

/** Navigate to a page and wait for h1 heading to appear */
export async function navigateAndExpectHeading(page: Page, path: string) {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1').first()).toBeVisible();
}

/** Fill a form field by label or placeholder, asserting it exists first */
export async function fillField(page: Page, labelOrPlaceholder: RegExp, value: string) {
    const field = page.getByLabel(labelOrPlaceholder).or(page.getByPlaceholder(labelOrPlaceholder));
    await expect(field.first()).toBeVisible();
    await field.first().fill(value);
    return field.first();
}

/** Assert the page URL matches a pattern */
export async function expectUrl(page: Page, pattern: RegExp) {
    await expect(page).toHaveURL(pattern);
}
