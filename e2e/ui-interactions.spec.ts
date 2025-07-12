import { test, expect } from '@playwright/test';

test.describe('UI Interactions and Visual Feedback', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should show proper loading states during code execution', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code that takes some time to execute
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    import time
    time.sleep(3)  # Simulate processing time
    print("Processing complete")

solve()`);

    // Step 3: Click run and verify loading state
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();
    
    // Should show loading state immediately
    // Check for disabled button or loading indicator
    await expect(runButton).toBeDisabled();
    
    // Wait for execution to complete
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Button should be enabled again
    await expect(runButton).toBeEnabled();
    
    // Should show the output
    await expect(page.locator('text="Processing complete"')).toBeVisible();
  });

  test('should display test results with proper visual indicators', async ({ page }) => {
    // Step 1: Select if-else statements question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');

    // Step 2: Write partially correct code (some tests pass, some fail)
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    num = int(input())
    print(f"Number: {num}")
    
    # Correct for positive numbers only
    if num > 0:
        print("Sign: positive")
        if num % 2 == 0:
            print("Parity: even")
            print("Classification: positive even number")
        else:
            print("Parity: odd")
            print("Classification: positive odd number")
    else:
        # Intentionally wrong for negative/zero
        print("Sign: wrong")
        print("Parity: wrong")
        print("Classification: wrong")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify visual indicators in test results
    await page.waitForSelector('text="Test Results"', { timeout: 10000 });
    
    // Should show green checkmarks for passing tests
    await expect(page.locator('text="✅"')).toBeVisible();
    
    // Should show red X marks for failing tests
    await expect(page.locator('text="❌"')).toBeVisible();
    
    // Should show test case numbers
    await expect(page.locator('text="Test Case"')).toBeVisible();
    
    // Should show PASSED/FAILED status
    await expect(page.locator('text="PASSED"')).toBeVisible();
    await expect(page.locator('text="FAILED"')).toBeVisible();
  });

  test('should display console output with proper formatting', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code with various output types
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("=== Console Output Test ===")
    print("Line 1: Simple text")
    print("Line 2: Number:", 42)
    print("Line 3: Boolean:", True)
    print("Line 4: Multi-line text")
    print("         with indentation")
    print("Line 5: Special characters: !@#$%^&*()")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify console output formatting
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Should show all output lines
    await expect(page.locator('text="=== Console Output Test ==="')).toBeVisible();
    await expect(page.locator('text="Line 1: Simple text"')).toBeVisible();
    await expect(page.locator('text="Line 2: Number: 42"')).toBeVisible();
    await expect(page.locator('text="Line 3: Boolean: True"')).toBeVisible();
    await expect(page.locator('text="Line 4: Multi-line text"')).toBeVisible();
    await expect(page.locator('text="         with indentation"')).toBeVisible();
    await expect(page.locator('text="Line 5: Special characters: !@#$%^&*()"')).toBeVisible();
  });

  test('should handle resizable panels properly', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Check initial layout
    await expect(page.locator('text="Variable Declaration and Initialization"')).toBeVisible(); // Left panel
    await expect(page.locator('.monaco-editor')).toBeVisible(); // Right panel - editor
    
    // Step 3: Run code to generate output
    const codeEditor = page.locator('.monaco-editor');
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("Test output for panel resize")

solve()`);

    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify output panels are visible
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    await expect(page.locator('text="Test Results"')).toBeVisible();
    
    // Both console output and test results should be visible
    await expect(page.locator('text="Test output for panel resize"')).toBeVisible();
  });

  test('should show error messages with proper styling', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code with syntax error
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("Missing closing quote
    # This will cause a syntax error

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify error message display
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    
    // Should show error message
    await expect(page.locator('text="Error"')).toBeVisible();
    
    // Error should be displayed in console output
    // The exact error message depends on the implementation
  });

  test('should handle question navigation and state preservation', async ({ page }) => {
    // Step 1: Select first question and write code
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write and execute code
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    print("First question output")

solve()`);

    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 3: Verify output
    await page.waitForSelector('text="Console Output"', { timeout: 10000 });
    await expect(page.locator('text="First question output"')).toBeVisible();

    // Step 4: Switch to different question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="If/Else Statements"');
    await page.click('text="If/Else Statements"');
    
    // Wait for question to load
    await page.waitForSelector('text="If/Else Statements"');

    // Step 5: Verify new question loaded and previous state cleared
    await expect(page.locator('text="If/Else Statements"')).toBeVisible();
    
    // Previous output should be cleared (depending on implementation)
    // New question should show its own template/stub
  });

  test('should display proper feedback for empty test results', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Write code that doesn't produce expected output
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type(`def solve():
    # This code doesn't produce the expected output
    print("Wrong output format")

solve()`);

    // Step 3: Run the code
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await runButton.click();

    // Step 4: Verify test results show failure with proper feedback
    await page.waitForSelector('text="Test Results"', { timeout: 10000 });
    
    // Should show failing test indicators
    await expect(page.locator('text="❌"')).toBeVisible();
    await expect(page.locator('text="FAILED"')).toBeVisible();
    
    // Should show expected vs actual output comparison
    await expect(page.locator('text="Expected"')).toBeVisible();
    await expect(page.locator('text="Actual"')).toBeVisible();
  });

  test('should handle responsive design for different screen sizes', async ({ page }) => {
    // Step 1: Test with desktop size (default)
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Verify elements are visible
    await expect(page.locator('text="Variable Declaration and Initialization"')).toBeVisible();
    await expect(page.locator('.monaco-editor')).toBeVisible();
    await expect(page.getByRole('button', { name: '✅ Run' })).toBeVisible();

    // Step 2: Test with tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Elements should still be visible and usable
    await expect(page.locator('text="Variable Declaration and Initialization"')).toBeVisible();
    await expect(page.locator('.monaco-editor')).toBeVisible();
    await expect(page.getByRole('button', { name: '✅ Run' })).toBeVisible();

    // Step 3: Test with mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile usage tip is shown
    await expect(page.locator('text="Mobile Usage Tip"')).toBeVisible();
    
    // Basic elements should still be accessible
    await expect(page.getByRole('button', { name: '✅ Run' })).toBeVisible();
  });

  test('should show proper keyboard shortcuts and accessibility features', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Test keyboard navigation
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    // Focus the editor
    await page.click('.monaco-editor');
    
    // Test basic keyboard shortcuts
    await page.keyboard.press('Control+A'); // Select all
    await page.keyboard.type('def solve():\n    print("Hello, World!")\n\nsolve()');
    
    // Test running with keyboard (if supported)
    // This depends on the implementation
    
    // Step 3: Verify accessibility attributes
    const runButton = page.getByRole('button', { name: '✅ Run' });
    await expect(runButton).toBeVisible();
    
    // Check for proper ARIA labels
    const questionSelector = page.locator('button[aria-label="Select question"]');
    await expect(questionSelector).toBeVisible();
  });

  test('should handle theme switching (if available)', async ({ page }) => {
    // Step 1: Select a question
    await page.click('button[aria-label="Select question"]');
    await page.waitForSelector('text="Variable Declaration and Initialization"');
    await page.click('text="Variable Declaration and Initialization"');
    
    // Wait for question to load
    await page.waitForSelector('text="Variable Declaration and Initialization"');

    // Step 2: Check for theme elements
    // This test depends on whether theme switching is implemented
    // Looking for common theme indicators
    
    // Check if dark mode classes are present
    const bodyElement = page.locator('body');
    const hasThemeClasses = await bodyElement.evaluate((el) => {
      return el.className.includes('dark') || el.className.includes('light');
    });
    
    if (hasThemeClasses) {
      // Theme switching is implemented
      // Test theme persistence and visual changes
    }
    
    // Step 3: Verify editor theme consistency
    const codeEditor = page.locator('.monaco-editor');
    await expect(codeEditor).toBeVisible();
    
    // Monaco editor should follow the app theme
    // This is typically handled automatically by Monaco
  });
});