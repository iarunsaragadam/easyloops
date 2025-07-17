import { test, expect } from '@playwright/test';

test.describe('Run Button Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('span:has-text("💻 Code Editor")');
  });

  test('@P1 should enable run button when code is entered', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello World")');

    // Check that run button is enabled
    const runButton = page.locator('button:has-text("Run")');
    await expect(runButton).toBeEnabled();
  });

  test('@P1 should show loading state when run button is clicked', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello World")');

    // Click run button
    const runButton = page.locator('button:has-text("Run")');
    await runButton.click();

    // Check that button shows loading state
    await expect(runButton).toHaveText('⏳ Running...');
    await expect(runButton).toBeDisabled();
  });

  test('@P1 should execute Python code and show results', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter Python code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print(Hello from Python")');

    // Click run button
    const runButton = page.locator('button:has-text("Run")');
    await runButton.click();

    // Wait for execution to complete (should show results or error)
    await page.waitForSelector(
      'text=/Sample Test Results|Error|Execution completed/',
      { timeout: 30000 }
    );

    // Check that button is re-enabled
    await expect(runButton).toBeEnabled();
    await expect(runButton).toHaveText('▶️ Run');
  });

  test('@P2 should handle syntax errors gracefully', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter invalid Python code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello World"'); // Missing closing quote

    // Click run button
    const runButton = page.locator('button:has-text("Run")');
    await runButton.click();

    // Wait for execution to complete
    await page.waitForSelector('text=/Error|SyntaxError|Execution completed/', {
      timeout: 30000,
    });

    // Check that button is re-enabled
    await expect(runButton).toBeEnabled();
  });

  test('@P2 should prevent multiple simultaneous executions', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('import time\ntime.sleep(2)\nprint(Done)');

    // Click run button
    const runButton = page.locator('button:has-text("Run")');
    await runButton.click();

    // Try to click again immediately (should be disabled)
    await expect(runButton).toBeDisabled();

    // Wait for execution to complete
    await page.waitForSelector(
      'text=/Sample Test Results|Error|Execution completed/',
      { timeout: 30000 }
    );

    // Check that button is re-enabled
    await expect(runButton).toBeEnabled();
  });

  test('@P3uld show test case results in output area', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P3' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter code that should pass test cases
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello")');

    // Click run button
    const runButton = page.locator('button:has-text("Run")');
    await runButton.click();

    // Wait for results
    await page.waitForSelector('.test-results-container', { timeout: 30000 });

    // Check that output area shows results
    const outputArea = page.locator('.test-results-container');
    const outputText = await outputArea.textContent();
    expect(outputText).toBeTruthy();
    expect(outputText?.length).toBeGreaterThan(0);
  });

  test('@P3 should show console output when available', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P3' });

    // Wait for Monaco editor to be ready
    await page.waitForSelector('.monaco-editor');

    // Enter code with print statements
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(
      'print("Console output test")\nprint("Second line")'
    );

    // Click run button
    const runButton = page.locator('button:has-text("Run")');
    await runButton.click();

    // Wait for results
    await page.waitForSelector('.test-results-container', { timeout: 30000 });

    // Check that console output is shown
    const outputArea = page.locator('.test-results-container');
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('Console output test');
  });
});
