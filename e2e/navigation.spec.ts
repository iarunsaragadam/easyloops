import { test, expect } from '@playwright/test';
import { clearPersistentState } from './test-utils';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a page first to ensure localStorage is accessible
    await page.goto('/');
    await page.waitForSelector('h1:has-text("Master Programming")');

    // Clear all persistent state after page loads
    await clearPersistentState(page);
  });

  test.afterEach(async ({ page }) => {
    // Clear persistent state after each test as well
    await clearPersistentState(page);
  });

  test('@P0 should navigate from home to questions page', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');
    await page.getByRole('link', { name: 'Browse Problems' }).click();
    await expect(page).toHaveURL('/questions/');
  });

  test('@P0 should navigate from home to first question via CTA', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');
    await page.getByRole('link', { name: 'Start Learning' }).click();
    await expect(page).toHaveURL(/\/questions\/\d+/);
  });

  test('@P0 should navigate from home to questions page via CTA', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');
    await page.getByRole('link', { name: 'Browse Problems' }).click();
    await expect(page).toHaveURL('/questions/');
  });

  test('@P0 should navigate from questions page back to home', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/questions/');
    await page.getByRole('link', { name: '🧠 EasyLoops' }).click();
    await expect(page).toHaveURL('/');
  });
});
