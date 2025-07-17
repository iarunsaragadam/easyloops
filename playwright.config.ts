import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 180000, // Increase global timeout to 3 minutes
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'NODE_ENV=test npm run dev -- --port 3001',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // Increase web server timeout to 2 minutes
    stdout: 'pipe', // Pipe stdout to see server logs
    stderr: 'pipe', // Pipe stderr to see server errors
  },
  // Support for priority-based test filtering
  grep: process.env.TEST_PRIORITY
    ? new RegExp(`@${process.env.TEST_PRIORITY}`)
    : undefined,
  grepInvert: process.env.TEST_PRIORITY ? undefined : undefined,
});
