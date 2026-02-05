import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1, // Retry failed tests once
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000, // 60 seconds per test
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:4455',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 45000, // 45 seconds for navigation
    actionTimeout: 15000, // 15 seconds for actions
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run local dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4455',
    reuseExistingServer: true, // Always reuse existing server if running
    timeout: 120 * 1000,
  },
});
