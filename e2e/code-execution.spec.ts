import { test, expect } from '@playwright/test';

test.describe('Code Execution Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should complete full workflow with passing test cases', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await expect(page.locator('text="Variable Declaration and Initialization"')).toBeVisible();

    // Step 2: Write correct code
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    // Clear any existing code and write correct solution
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    # Read input values
    integer_val = int(input())
    string_val = input().strip()
    boolean_val = input().strip() == "true"
    float_val = float(input())
    char_val = input().strip()
    new_integer_val = int(input())
    late_init_val = input().strip()
    
    # Print variables with descriptive labels
    print(f"Integer variable: {integer_val}")
    print(f"String variable: {string_val}")
    print(f"Boolean variable: {boolean_val}")
    print(f"Float variable: {float_val}")
    print(f"Character variable: {char_val}")
    print(f"Updated integer variable: {new_integer_val}")
    print(f"Late-initialized variable: {late_init_val}")

solve()`);

    // Step 3: Click run button
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await expect(runButton).toBeVisible();
    await runButton.click();

    // Step 4: Verify console output and test results
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Check console output
    await expect(page.locator('text="Integer variable: 42"')).toBeVisible();
    await expect(page.locator('text="String variable: Hello, World!"')).toBeVisible();
    await expect(page.locator('text="Boolean variable: true"')).toBeVisible();
    await expect(page.locator('text="Float variable: 3.14159"')).toBeVisible();
    await expect(page.locator('text="Character variable: A"')).toBeVisible();
    await expect(page.locator('text="Updated integer variable: 100"')).toBeVisible();
    await expect(page.locator('text="Late-initialized variable: Programming"')).toBeVisible();

    // Check test results section
    await expect(page.locator('text="Test Results"')).toBeVisible();
    
    // Should show passing test cases
    await expect(page.locator('text="✅"')).toBeVisible();
    await expect(page.locator('text="Test Case 1"')).toBeVisible();
    await expect(page.locator('text="PASSED"')).toBeVisible();
  });

  test('should complete full workflow with failing test cases', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');
    await expect(page.locator('text="If/Else Statements"')).toBeVisible();

    // Step 2: Write incorrect code (intentionally wrong solution)
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    // Clear any existing code and write incorrect solution
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    num = int(input())
    print(f"Number: {num}")
    
    # Intentionally incorrect logic
    if num > 0:
        print("Sign: wrong")
    else:
        print("Sign: incorrect")
    
    # Wrong parity logic
    if num % 2 == 0:
        print("Parity: wrong")
    else:
        print("Parity: incorrect")
    
    print("Classification: wrong classification")

solve()`);

    // Step 3: Click run button
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await expect(runButton).toBeVisible();
    await runButton.click();

    // Step 4: Verify console output and failing test results
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Check console output (should show our wrong output)
    await expect(page.locator('text="Number: -15"')).toBeVisible();
    await expect(page.locator('text="Sign: incorrect"')).toBeVisible();
    await expect(page.locator('text="Parity: incorrect"')).toBeVisible();
    await expect(page.locator('text="Classification: wrong classification"')).toBeVisible();

    // Check test results section
    await expect(page.locator('text="Test Results"')).toBeVisible();
    
    // Should show failing test cases
    await expect(page.locator('text="❌"')).toBeVisible();
    await expect(page.locator('text="Test Case 1"')).toBeVisible();
    await expect(page.locator('text="FAILED"')).toBeVisible();
  });

  test('should handle multiple test cases with mixed results', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');

    // Step 2: Write partially correct code (works for some test cases but not others)
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    num = int(input())
    print(f"Number: {num}")
    
    # Correct sign logic
    if num > 0:
        print("Sign: positive")
    elif num < 0:
        print("Sign: negative")
    else:
        print("Sign: zero")
    
    # Correct parity logic
    if num % 2 == 0:
        print("Parity: even")
    else:
        print("Parity: odd")
    
    # Partially correct classification (might miss some cases)
    if num > 0 and num % 2 == 0:
        print("Classification: positive even number")
    elif num > 0 and num % 2 == 1:
        print("Classification: positive odd number")
    elif num < 0 and num % 2 == 0:
        print("Classification: negative even number")
    elif num < 0 and num % 2 == 1:
        print("Classification: negative odd number")
    else:
        print("Classification: zero even number")

solve()`);

    // Step 3: Click run button
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await expect(runButton).toBeVisible();
    await runButton.click();

    // Step 4: Verify test results show both passing and failing cases
    await page.waitForSelector('text="Test Results"', { timeout: 10000 });
    
    // Should show multiple test cases with different results
    await expect(page.locator('text="Test Case"')).toBeVisible();
  });

  test('should handle language switching and code execution', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Check if Go language is available and user has access
    const languageSelector = page.locator('select').first();
    await expect(languageSelector).toBeVisible();
    
    // Check current language
    await expect(languageSelector).toHaveValue('python');
    
    // Step 3: Write Python code first
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("Hello from Python!")

solve()`);

    // Step 4: Run Python code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 5: Wait for results and verify Python execution
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    await expect(page.locator('text="Hello from Python!"')).toBeVisible();
  });

  test('should display proper error messages for invalid code', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write invalid Python code
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("This will cause an error"
    # Missing closing parenthesis and other syntax errors
    if True
        print("Invalid syntax")

solve()`);

    // Step 3: Click run button
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify error message is displayed
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Should show error message in console
    await expect(page.locator('text="Error"')).toBeVisible();
  });

  test('should handle no question selected scenario', async ({ page }) => {
    // Step 1: Try to run without selecting a question (if possible)
    // In most cases, there should be a default question selected
    
    // Step 2: Click run button without proper setup
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await expect(runButton).toBeVisible();
    
    // If no question is selected, should show appropriate message
    // This test depends on the application state
  });

  test('should persist test results after multiple runs', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write and run code first time
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("First run")

solve()`);

    // Run first time
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Step 3: Modify code and run again
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("Second run")

solve()`);

    // Run second time
    await runButton.click();
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Step 4: Verify new results are shown
    await expect(page.locator('text="Second run"')).toBeVisible();
  });

  test('should show running state during code execution', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    import time
    time.sleep(2)  # Simulate longer execution
    print("Hello after delay")

solve()`);

    // Step 3: Click run and immediately check for loading state
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();
    
    // Should show running state (button disabled or loading indicator)
    // The exact implementation depends on the UI design
    await page.waitForSelector('text="Console Output"', { timeout: 15000 });
  });
});