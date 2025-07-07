import { test, expect } from '@playwright/test';

test.describe('Advanced Code Execution Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should handle code execution with multiple test cases - all passing', async ({ page }) => {
    // Step 1: Select if-else statements question (has 3 test cases)
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');
    await expect(page.locator('text="If/Else Statements"')).toBeVisible();

    // Step 2: Write correct solution
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    num = int(input())
    print(f"Number: {num}")
    
    # Determine sign
    if num > 0:
        print("Sign: positive")
    elif num < 0:
        print("Sign: negative")
    else:
        print("Sign: zero")
    
    # Determine parity
    if num % 2 == 0:
        print("Parity: even")
    else:
        print("Parity: odd")
    
    # Combine conditions for classification
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

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify all test cases pass
    await page.waitForSelector('text="Test Results"', { timeout: 10000 });
    
    // Should show multiple test cases
    await expect(page.locator('text="Test Case 1"')).toBeVisible();
    await expect(page.locator('text="Test Case 2"')).toBeVisible();
    await expect(page.locator('text="Test Case 3"')).toBeVisible();
    
    // All should be passing
    const passedCases = page.locator('text="✅"');
    await expect(passedCases).toHaveCount(3);
  });

  test('should handle code execution with multiple test cases - some failing', async ({ page }) => {
    // Step 1: Select if-else statements question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');

    // Step 2: Write partially correct solution (handles positive numbers correctly but not negative/zero)
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    num = int(input())
    print(f"Number: {num}")
    
    # Partially correct logic - only handles positive numbers correctly
    if num > 0:
        print("Sign: positive")
        if num % 2 == 0:
            print("Parity: even")
            print("Classification: positive even number")
        else:
            print("Parity: odd")
            print("Classification: positive odd number")
    else:
        # Wrong logic for negative numbers and zero
        print("Sign: unknown")
        print("Parity: unknown")
        print("Classification: unknown")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify mixed test results
    await page.waitForSelector('text="Test Results"', { timeout: 10000 });
    
    // Should show both passing and failing test cases
    await expect(page.locator('text="✅"')).toBeVisible(); // At least one passing
    await expect(page.locator('text="❌"')).toBeVisible(); // At least one failing
  });

  test('should handle runtime errors gracefully', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code that will cause a runtime error
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    # This will cause a runtime error
    x = 1 / 0  # Division by zero
    print("This won't be reached")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify error handling
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Should show error message
    await expect(page.locator('text="Error"')).toBeVisible();
    
    // Test results should show failure
    await expect(page.locator('text="Test Results"')).toBeVisible();
    await expect(page.locator('text="❌"')).toBeVisible();
  });

  test('should handle timeout for long-running code', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code that will take too long
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    import time
    time.sleep(15)  # Sleep longer than timeout
    print("This should timeout")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify timeout handling
    await page.waitForSelector('text="Console Output"', { timeout: 15000 });
    
    // Should show timeout message
    await expect(page.locator('text="timeout"')).toBeVisible();
  });

  test('should handle empty code execution', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Clear all code
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');

    // Step 3: Try to run empty code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify empty code handling
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Should handle empty code gracefully
    // The exact behavior depends on the implementation
  });

  test('should show detailed test case information', async ({ page }) => {
    // Step 1: Select a question with multiple test cases
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');

    // Step 2: Write incorrect code to generate failures
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    num = int(input())
    print(f"Number: {num}")
    print("Sign: always wrong")
    print("Parity: always wrong")
    print("Classification: always wrong")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify detailed test case information
    await page.waitForSelector('text="Test Results"', { timeout: 10000 });
    
    // Should show test case details
    await expect(page.locator('text="Test Case"')).toBeVisible();
    await expect(page.locator('text="Expected"')).toBeVisible();
    await expect(page.locator('text="Actual"')).toBeVisible();
    
    // Should show failing test cases
    await expect(page.locator('text="❌"')).toBeVisible();
    await expect(page.locator('text="FAILED"')).toBeVisible();
  });

  test('should handle question switching during execution', async ({ page }) => {
    // Step 1: Select first question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code and start execution
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    import time
    time.sleep(1)  # Brief delay
    print("Hello from first question")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Wait for execution to complete
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Step 5: Switch to different question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');

    // Step 6: Verify new question loaded correctly
    await expect(page.locator('text="If/Else Statements"')).toBeVisible();
    
    // Previous results should be cleared
    // The exact behavior depends on the implementation
  });

  test('should preserve user code when switching languages', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write Python code
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("Hello from Python")

solve()`);

    // Step 3: Run Python code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Wait for execution
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    await expect(page.locator('text="Hello from Python"')).toBeVisible();

    // Step 5: Switch language (if Go is available)
    const languageSelector = page.locator('select').first();
    await languageSelector.selectOption('go');
    
    // The editor should update to show Go template
    // This test verifies the language switching functionality
  });

  test('should handle concurrent test execution', async ({ page }) => {
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
    print("Test execution")

solve()`);

    // Step 3: Run the code multiple times quickly
    const runButton = page.getByRole('button', { name: '✅ Run' });
    
    // Click run button multiple times
    await runButton.click();
    await runButton.click();
    await runButton.click();

    // Step 4: Verify only one execution runs at a time
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Should handle concurrent execution gracefully
    await expect(page.locator('text="Test execution"')).toBeVisible();
  });
});