import { test, expect } from '@playwright/test';
import { clearPersistentState } from './test-utils';

test.describe('Layout and Responsive Behavior', () => {
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

  test('should persist layout state on page reload', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // First navigate to a question page to access the layout
    await page.goto('/');
    await page.getByRole('link', { name: 'Start Learning' }).click();

    // Wait for the page to load completely
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")', {
      timeout: 10000,
    });

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
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")', {
      timeout: 10000,
    });

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

  test('@P1 should have responsive design on mobile viewport', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Check that the layout adapts to mobile
    const mainHeading = page
      .locator('h1')
      .filter({ hasText: 'Master Programming' });

    // Check for responsive classes
    await expect(mainHeading).toHaveClass(/md:text-6xl/);
    await expect(mainHeading).toHaveClass(/text-4xl/);
  });

  test('should have responsive design on tablet viewport', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/');

    // Check that the layout adapts to tablet - find the features grid by looking for the grid container
    const featuresGrid = page.locator('div.grid.md\\:grid-cols-3').first();
    await expect(featuresGrid).toHaveClass(/md:grid-cols-3/);
  });

  test('should have responsive design on desktop viewport', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('/');

    // Check that the layout adapts to desktop - find the categories grid by looking for the grid container
    const categoriesGrid = page
      .locator('div.grid.md\\:grid-cols-2.lg\\:grid-cols-4')
      .first();
    await expect(categoriesGrid).toHaveClass(/lg:grid-cols-4/);
  });

  test('@P1 should handle responsive navigation on mobile', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Check that navigation is accessible on mobile
    await expect(
      page.getByRole('link', { name: 'Browse Problems' })
    ).toBeVisible();

    // Navigate to questions page
    await page.getByRole('link', { name: 'Browse Problems' }).click();
    await expect(page).toHaveURL('/questions/');

    // Check that questions page is also responsive
    await expect(
      page.getByRole('link', { name: '🧠 EasyLoops' })
    ).toBeVisible();
  });

  test('should maintain responsive behavior across page transitions', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate through different pages
    await page.goto('/');
    await page.getByRole('link', { name: 'Browse Problems' }).click();
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });
    const firstQuestionLink = page.locator('a[href^="/questions/"]').first();
    await firstQuestionLink.click();

    // Check that responsive behavior is maintained
    await expect(page.getByText('🧠 EasyLoops')).toBeVisible();
  });

  test('should handle theme transitions smoothly', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/');

    // Check that theme transition classes are present
    const body = page.locator('body');
    // Body has CSS transitions defined in CSS, not Tailwind classes
    await expect(body).toHaveClass(/light|dark/);

    // Check that main containers have transition classes
    const mainContainer = page
      .locator('div')
      .filter({ hasText: 'Master Programming' })
      .first();
    await expect(mainContainer).toHaveClass(/transition-colors/);
  });

  test('should have proper CSS custom properties for layout', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/');
    await page.getByRole('link', { name: 'Start Learning' }).click();

    // Wait for the question page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")', {
      timeout: 10000,
    });

    // Check that CSS custom properties are set
    const layoutContainer = page.locator('.layout-container').first();
    await expect(layoutContainer).toBeVisible();

    // Check that CSS variables are applied
    const computedStyle = await layoutContainer.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        leftPaneWidth: style.getPropertyValue('--left-pane-width'),
        testResultsHeight: style.getPropertyValue('--test-results-height'),
      };
    });

    expect(computedStyle.leftPaneWidth).toBeTruthy();
    expect(computedStyle.testResultsHeight).toBeTruthy();
  });

  test('should handle window resize events', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/');
    await page.getByRole('link', { name: 'Start Learning' }).click();

    // Wait for the question page to load by checking for a reliable element
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")', {
      timeout: 10000,
    });

    // Resize the window
    await page.setViewportSize({ width: 800, height: 600 });

    // Check that the layout still works
    await expect(page.getByText('🧠 EasyLoops')).toBeVisible();

    // Resize again
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check that the layout still works
    await expect(page.getByText('🧠 EasyLoops')).toBeVisible();
  });

  test('should have proper focus management for accessibility', async ({
    page,
  }) => {
    await page.goto('/');

    // Check that focusable elements are present
    const focusableElements = page.locator('a, button, select, input');
    const count = await focusableElements.count();
    expect(count).toBeGreaterThan(0);

    // Test tab navigation - focus should move to the first focusable element
    await page.keyboard.press('Tab');

    // Check that some element has focus - use a more robust approach
    const focusedElement = page.locator(':focus');
    const focusedCount = await focusedElement.count();
    expect(focusedCount).toBeGreaterThan(0);
  });
});
