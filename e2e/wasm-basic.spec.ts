import { test, expect } from '@playwright/test';

test.describe('WASM Basic Tests', () => {
  test('should load the question page with language selector', async ({
    page,
  }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Check that the language selector is present
    const languageSelector = page.locator(
      'button[aria-label="Select language"]'
    );
    await expect(languageSelector).toBeVisible();

    // Check that Python3 is selected by default
    await expect(languageSelector).toContainText('Python3');

    // Check that the code editor section is present
    await expect(page.locator('span:has-text("💻 Code Editor")')).toBeVisible();

    // Check that the Run button is present
    await expect(page.locator('button:has-text("Run")')).toBeVisible();
  });

  test('should open language selector dropdown', async ({ page }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Click the language selector
    const languageSelector = page.locator(
      'button[aria-label="Select language"]'
    );
    await languageSelector.click();

    // Wait for dropdown to appear
    const dropdown = page.locator('button[aria-label="Select language"] + div');
    await expect(dropdown).toBeVisible();

    // Check that Python3 option is in the dropdown (scoped to dropdown)
    await expect(dropdown.locator('button:has-text("Python3")')).toBeVisible();
  });

  test('should check available language options', async ({ page }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Click the language selector
    const languageSelector = page.locator(
      'button[aria-label="Select language"]'
    );
    await languageSelector.click();

    // Wait for dropdown to appear
    const dropdown = page.locator('button[aria-label="Select language"] + div');
    await expect(dropdown).toBeVisible();

    // Get all available language options
    const languageOptions = await dropdown.locator('button').allTextContents();
    console.log('Available languages:', languageOptions);

    // Check that at least Python3 is available
    expect(languageOptions).toContain('Python3');

    // Log all available options for debugging
    languageOptions.forEach((option, index) => {
      console.log(`Option ${index + 1}: "${option}"`);
    });
  });

  test('should type and run Python code', async ({ page }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Wait for the Monaco editor to be ready
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Click on the editor to focus it
    await page.locator('.monaco-editor').click();

    // Clear any existing content and type new code
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello from Python WASM!")');

    // Click the Run button
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete - look for output
    await page.waitForSelector(
      'text=/Sample Test Results|Hello from Python WASM!/',
      {
        timeout: 30000,
      }
    );

    // Check that the output contains our message
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toContain('Hello from Python WASM!');
  });

  test('should run complex Python code with variables and functions', async ({
    page,
  }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Wait for the Monaco editor to be ready
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Click on the editor to focus it
    await page.locator('.monaco-editor').click();

    // Clear any existing content and type complex Python code
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`
def greet(name):
    return f"Hello, {name}!"

message = greet("WASM Python")
print(message)
result = 10 + 20
print(f"Result: {result}")
`);

    // Click the Run button
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete
    await page.waitForSelector(
      'text=/Sample Test Results|Executed using: python/',
      {
        timeout: 30000,
      }
    );

    // Check that the output shows WASM backend was used
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toContain('Executed using: python (WasmBackend)');

    // Check that test results are displayed (even if they fail)
    expect(output || '').toContain('Sample Test Results');
  });

  test('should print output and log the full output area', async ({ page }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Wait for the Monaco editor to be ready
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Click on the editor to focus it
    await page.locator('.monaco-editor').click();

    // Clear any existing content and type a print statement
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("PLAYWRIGHT_OUTPUT_TEST")');

    // Click the Run button
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete
    await page.waitForSelector(
      'text=/Sample Test Results|PLAYWRIGHT_OUTPUT_TEST/',
      {
        timeout: 30000,
      }
    );

    // Log the full output area for inspection
    const output = await page.locator('.test-results-container').textContent();
    console.log('FULL OUTPUT AREA:', output);
    // The test will always pass, this is for inspection
    expect(output).toBeDefined();
  });

  test('should show both test case results and print output', async ({
    page,
  }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("BOTH_OUTPUT_TEST")');
    await page.locator('button:has-text("Run")').click();
    await page.waitForSelector('text=/Sample Test Results|BOTH_OUTPUT_TEST/', {
      timeout: 30000,
    });
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toContain('Sample Test Results');
    expect(output || '').toContain('BOTH_OUTPUT_TEST');
  });

  test('should show error output for Python syntax error', async ({ page }) => {
    // Navigate to a question page
    await page.goto('/questions/01-variable-declaration/');
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("SYNTAX_ERROR_TEST"'); // missing closing parenthesis
    await page.locator('button:has-text("Run")').click();
    await page.waitForSelector('text=/Error|SyntaxError|Traceback/', {
      timeout: 30000,
    });
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toMatch(/Error|SyntaxError|Traceback/);
  });
});
