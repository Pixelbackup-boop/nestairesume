/**
 * Accessibility E2E Tests
 * Uses @axe-core/playwright for automated WCAG 2.0 AA compliance checks.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage has no critical or serious axe violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // Tested separately via unit tests on exact hex values
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} elements)`
      );
      expect(critical, `Axe violations:\n${summary.join('\n')}`).toHaveLength(0);
    }
  });

  test('homepage heading hierarchy has no skipped levels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scope to main content only — footer/nav have independent heading hierarchies.
    // Skip headings inside aria-hidden subtrees: those elements are decorative
    // (e.g. resume template previews on the homepage) and intentionally excluded
    // from the page's heading outline.
    const allMainHeadings = await page.locator('main :is(h1, h2, h3, h4, h5, h6)').all();
    const headingLevels: number[] = [];
    for (const h of allMainHeadings) {
      const isDecorative = await h.evaluate(
        (el) => el.closest('[aria-hidden="true"]') !== null,
      );
      if (isDecorative) continue;
      const tag = await h.evaluate((el) => el.tagName);
      headingLevels.push(parseInt(tag[1]));
    }

    // Verify no skipped levels (e.g., h1 -> h3 without h2)
    for (let i = 1; i < headingLevels.length; i++) {
      const jump = headingLevels[i] - headingLevels[i - 1];
      expect(
        jump,
        `Heading skip: h${headingLevels[i - 1]} to h${headingLevels[i]} at index ${i}`
      ).toBeLessThanOrEqual(1);
    }
  });

  test('homepage images have alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const imagesWithoutAlt = await page.$$eval('img', (images) =>
      images
        .filter((img) => !img.getAttribute('alt') && img.getAttribute('alt') !== '')
        .map((img) => img.getAttribute('src') || 'unknown')
    );

    expect(
      imagesWithoutAlt,
      `Images missing alt: ${imagesWithoutAlt.join(', ')}`
    ).toHaveLength(0);
  });

  test('builder page has no critical axe violations', async ({ page }) => {
    await page.goto('/builder');
    await page.waitForLoadState('domcontentloaded');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const critical = results.violations.filter((v) => v.impact === 'critical');

    if (critical.length > 0) {
      const summary = critical.map(
        (v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} elements)`
      );
      expect(critical, `Axe violations:\n${summary.join('\n')}`).toHaveLength(0);
    }
  });

  test('homepage interactive elements are keyboard-accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check that focusable elements exist
    const focusableSelectors = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableCount = await page.locator(focusableSelectors).count();
    expect(focusableCount).toBeGreaterThan(0);

    // Press Tab and verify focus moves to an interactive element
    await page.keyboard.press('Tab');
    const firstFocused = await page.locator(':focus').first();
    await expect(firstFocused).toBeAttached();

    // Tab again to confirm focus moves forward
    await page.keyboard.press('Tab');
    const secondFocused = await page.locator(':focus').first();
    await expect(secondFocused).toBeAttached();
  });

  test('homepage links are distinguishable from surrounding text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check inline links within content paragraphs (not nav/footer list links)
    const inlineLinks = await page.$$eval(
      'main p a',
      (links) =>
        links.map((a) => {
          const style = window.getComputedStyle(a);
          return {
            text: a.textContent?.trim().slice(0, 30) || '',
            hasUnderline: style.textDecoration.includes('underline'),
            hasBorder: style.borderBottomWidth !== '0px',
          };
        })
    );

    // At least 80% of inline links should have visual indicators
    const distinguishable = inlineLinks.filter(
      (l) => l.hasUnderline || l.hasBorder
    );
    if (inlineLinks.length > 0) {
      const ratio = distinguishable.length / inlineLinks.length;
      expect(ratio).toBeGreaterThanOrEqual(0.8);
    }
  });
});
