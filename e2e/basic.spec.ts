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
    const languageSelector = page.getByRole('combobox', { name: /language/i });
    await expect(languageSelector).toBeVisible();

    // Should have Python as default
    await expect(languageSelector).toHaveValue('python');
  });

  test('should display question selector', async ({ page }) => {
    await page.goto('/');

    // Check if question selector is present
    const questionSelector = page.getByRole('combobox', { name: /question/i });
    await expect(questionSelector).toBeVisible();
  });

  test('should show authentication button', async ({ page }) => {
    await page.goto('/');

    // Check if auth button is present
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });
});
