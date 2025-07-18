import { test, expect } from '@playwright/test';
import { clearPersistentState } from './test-utils';

test.describe('Home Page', () => {
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

  test('@P0 should load the home page with correct content', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');

    // Check main heading and branding
    await expect(page.getByText('🧠 EasyLoops')).toBeVisible();
    await expect(page.getByText('Master Programming')).toBeVisible();
    // Target the specific heading that contains "One Problem at a Time"
    await expect(
      page
        .getByRole('heading', { level: 1 })
        .filter({ hasText: 'One Problem at a Time' })
    ).toBeVisible();
  });

  test('@P0 should display hero section with call-to-action buttons', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');

    // Check hero section content
    await expect(
      page.getByText(
        'Interactive coding challenges designed to build your programming skills systematically'
      )
    ).toBeVisible();

    // Check CTA buttons
    await expect(
      page.getByRole('link', { name: 'Start Learning' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Browse Problems' })
    ).toBeVisible();
  });

  test('@P1 should display features section', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    await page.goto('/');

    // Check feature cards
    await expect(page.getByText('Interactive Editor')).toBeVisible();
    await expect(page.getByText('Comprehensive Testing')).toBeVisible();
    await expect(page.getByText('Structured Learning')).toBeVisible();

    // Check feature descriptions
    await expect(
      page.getByText('Write, run, and test your code in real-time')
    ).toBeVisible();
    await expect(
      page.getByText('Get instant feedback with multiple test cases')
    ).toBeVisible();
    await expect(
      page.getByText('Progress through carefully curated problems')
    ).toBeVisible();
  });

  test('@P1 should display learning categories', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    await page.goto('/');

    // Check category section heading
    await expect(page.getByText("What You'll Learn")).toBeVisible();

    // Check category cards - target specific h4 headings
    await expect(
      page.getByRole('heading', { level: 4, name: 'Fundamentals' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 4, name: 'Control Flow' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 4, name: 'Data Structures' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 4, name: 'Algorithms' })
    ).toBeVisible();
  });

  test('@P2 should display footer with copyright', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/');

    // Check footer content
    await expect(
      page.getByText(
        '© 2024 EasyLoops. Learn programming, one problem at a time.'
      )
    ).toBeVisible();
  });

  test('@P0 should have working navigation links', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');

    // Check navigation link in hero section
    await expect(
      page.getByRole('link', { name: 'Browse Problems' })
    ).toBeVisible();

    // Click navigation link and verify it goes to questions page
    await page.getByRole('link', { name: 'Browse Problems' }).click();
    await expect(page).toHaveURL(/\/questions\/?$/);
  });

  test('@P0 should have working CTA links', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/');

    // Test "Start Learning" button - should go to first question
    await page.getByRole('link', { name: 'Start Learning' }).click();
    await expect(page).toHaveURL(/\/questions\/\d+/);

    // Go back to home
    await page.goto('/');

    // Test "Browse Problems" button
    await page.getByRole('link', { name: 'Browse Problems' }).click();
    await expect(page).toHaveURL(/\/questions\/?$/);
  });

  test('@P2 should support theme styling', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/');

    // Check that theme classes are present in the HTML structure
    const body = page.locator('body');
    await expect(body).toHaveClass(/light|dark/);

    // Check that gradient background classes are present
    const mainContainer = page
      .locator('div')
      .filter({ hasText: 'Master Programming' })
      .first();
    await expect(mainContainer).toHaveClass(/from-.*to-.*/);
  });
});
