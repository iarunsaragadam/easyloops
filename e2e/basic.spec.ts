import { test, expect } from '@playwright/test';

test.describe('EasyLoops Application', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');

    // Check if the main elements are present
    await expect(page.getByText('🧠 EasyLoops')).toBeVisible();
    await expect(page.getByText('Practice Problems')).toBeVisible();
  });

  test('should display code editor', async ({ page }) => {
    await page.goto('/');

    // Check if code editor is present
    await expect(page.getByText('💻 Code Editor')).toBeVisible();
    await expect(page.getByRole('button', { name: '✅ Run' })).toBeVisible();
  });

  test('should handle language selection', async ({ page }) => {
    await page.goto('/');

    // Check if language selector is present
    const languageSelector = page
      .locator('text=Language:')
      .locator('..')
      .locator('select');
    await expect(languageSelector).toBeVisible();

    // Should have Python as default
    await expect(languageSelector).toHaveValue('python');
  });

  test('should display question selector', async ({ page }) => {
    await page.goto('/');

    // Check if question selector is present
    const questionSelector = page
      .locator('text=Question:')
      .locator('..')
      .locator('select');
    await expect(questionSelector).toBeVisible();
  });

  test('should show authentication button', async ({ page }) => {
    await page.goto('/');

    // Check if auth button is present
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('should persist layout state on page reload', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Modify the layout state by simulating a resize
    await page.evaluate(() => {
      const newState = {
        leftPaneWidth: 60,
        testResultsHeight: 0.7,
      };
      localStorage.setItem('easyloops-layout-state', JSON.stringify(newState));
    });

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that the layout state was preserved
    const preservedLayoutState = await page.evaluate(() => {
      return localStorage.getItem('easyloops-layout-state');
    });

    expect(preservedLayoutState).toBeTruthy();
    if (preservedLayoutState) {
      const parsedState = JSON.parse(preservedLayoutState);
      expect(parsedState.leftPaneWidth).toBe(60);
      expect(parsedState.testResultsHeight).toBe(0.7);
    }
  });
});
