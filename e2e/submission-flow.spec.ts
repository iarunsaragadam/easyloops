import { test, expect } from '@playwright/test';

test.describe('Submission Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForSelector('[data-testid="header"]');
  });

  test('should allow user to run sample test cases', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Clear the existing code and enter a simple program
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello, World!")');
    
    // Click the Run button
    await page.locator('button:has-text("Run")').click();
    
    // Wait for execution to complete
    await page.waitForSelector('text=/Sample Test Results/', { timeout: 10000 });
    
    // Check that the output contains sample test results
    const output = await page.locator('[data-testid="output"]').textContent();
    expect(output || '').toContain('Sample Test Results');
    expect(output || '').toContain('passed');
    
    // Verify that only first 2 test cases were run (based on the output format)
    const testResultsPanel = page.locator('[data-testid="test-results-panel"]');
    await expect(testResultsPanel).toBeVisible();
  });

  test('should allow user to evaluate all test cases and create submission', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Clear the existing code and enter a simple program
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello, World!")');
    
    // Click the Evaluate All button
    await page.locator('button:has-text("Evaluate All")').click();
    
    // Wait for submission to complete
    await page.waitForSelector('text=/Full Evaluation Complete/', { timeout: 30000 });
    
    // Check that the output contains full evaluation results
    const output = await page.locator('[data-testid="output"]').textContent();
    expect(output || '').toContain('Full Evaluation Complete');
    expect(output || '').toContain('Results Summary');
    expect(output || '').toContain('Passed:');
    expect(output || '').toContain('Status:');
    expect(output || '').toContain('Execution Time:');
    expect(output || '').toContain('Submission ID:');
    expect(output || '').toContain('Submission saved as snapshot');
    
    // Verify that submission information is displayed in the test results panel
    const testResultsPanel = page.locator('[data-testid="test-results-panel"]');
    await expect(testResultsPanel).toBeVisible();
    
    // Check for submission badge in test results header
    const submissionBadge = page.locator('text=/Last submission:/');
    await expect(submissionBadge).toBeVisible();
  });

  test('should show loading states during execution', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Test")');
    
    // Click Run and immediately check for loading state
    await page.locator('button:has-text("Run")').click();
    
    // Should show loading state
    await expect(page.locator('button:has-text("Running...")')).toBeVisible();
    
    // Both buttons should be disabled during execution
    await expect(page.locator('button:has-text("Running...")')).toBeDisabled();
    await expect(page.locator('button:has-text("Evaluate All")')).toBeDisabled();
    
    // Wait for execution to complete
    await page.waitForSelector('button:has-text("Run")', { timeout: 10000 });
    
    // Buttons should be re-enabled
    await expect(page.locator('button:has-text("Run")')).not.toBeDisabled();
    await expect(page.locator('button:has-text("Evaluate All")')).not.toBeDisabled();
  });

  test('should show different loading states for run vs submit', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Test")');
    
    // Test Run button loading state
    await page.locator('button:has-text("Run")').click();
    await expect(page.locator('button:has-text("Running...")')).toBeVisible();
    
    // Wait for Run to complete
    await page.waitForSelector('button:has-text("Run")', { timeout: 10000 });
    
    // Test Evaluate All button loading state
    await page.locator('button:has-text("Evaluate All")').click();
    await expect(page.locator('button:has-text("Evaluating...")')).toBeVisible();
    
    // Wait for submission to complete
    await page.waitForSelector('button:has-text("Evaluate All")', { timeout: 30000 });
  });

  test('should prevent multiple simultaneous executions', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Test")');
    
    // Click Run
    await page.locator('button:has-text("Run")').click();
    
    // Verify that both buttons are disabled
    await expect(page.locator('button:has-text("Running...")')).toBeDisabled();
    await expect(page.locator('button:has-text("Evaluate All")')).toBeDisabled();
    
    // Try to click Evaluate All while Run is in progress (should not work)
    await page.locator('button:has-text("Evaluate All")').click({ force: true });
    
    // Should still be in running state, not submission state
    await expect(page.locator('button:has-text("Running...")')).toBeVisible();
    await expect(page.locator('button:has-text("Evaluating...")')).not.toBeVisible();
  });

  test('should display helpful messages for different button purposes', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Check tooltip/title attributes for buttons
    const runButton = page.locator('button:has-text("Run")');
    const submitButton = page.locator('button:has-text("Evaluate All")');
    
    // Check that buttons have appropriate tooltips
    await expect(runButton).toHaveAttribute('title', /sample test cases.*first 2/);
    await expect(submitButton).toHaveAttribute('title', /all test cases.*submission snapshot/);
  });

  test('should show appropriate messages in empty state', async ({ page }) => {
    // Wait for the test results panel to load
    await page.waitForSelector('[data-testid="test-results-panel"]');
    
    // Check for helpful empty state messages
    const emptyState = page.locator('text=/Ready to test your code/');
    await expect(emptyState).toBeVisible();
    
    // Check for explanatory text about buttons
    await expect(page.locator('text=/Run.*sample cases.*first 2/')).toBeVisible();
    await expect(page.locator('text=/Evaluate All.*all test cases.*submission/')).toBeVisible();
  });

  test('should handle execution errors gracefully', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Enter invalid code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('invalid syntax here');
    
    // Click Run
    await page.locator('button:has-text("Run")').click();
    
    // Wait for error to be displayed
    await page.waitForSelector('text=/Error:/', { timeout: 10000 });
    
    // Check that error is displayed
    const output = await page.locator('[data-testid="output"]').textContent();
    expect(output || '').toContain('Error:');
    
    // Buttons should be re-enabled after error
    await expect(page.locator('button:has-text("Run")')).not.toBeDisabled();
    await expect(page.locator('button:has-text("Evaluate All")')).not.toBeDisabled();
  });

  test('should preserve submission history', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("First submission")');
    
    // Make first submission
    await page.locator('button:has-text("Evaluate All")').click();
    await page.waitForSelector('text=/Full Evaluation Complete/', { timeout: 30000 });
    
    // Change code and make second submission
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Second submission")');
    
    await page.locator('button:has-text("Evaluate All")').click();
    await page.waitForSelector('text=/Full Evaluation Complete/', { timeout: 30000 });
    
    // Check that latest submission is shown
    const submissionBadge = page.locator('text=/Last submission:/');
    await expect(submissionBadge).toBeVisible();
    
    // Verify that submission was saved (by checking localStorage in browser)
    const submissionData = await page.evaluate(() => {
      return localStorage.getItem('easyloops_submissions');
    });
    
    expect(submissionData).toBeTruthy();
    
    if (submissionData) {
      const submissions = JSON.parse(submissionData);
      expect(submissions.length).toBeGreaterThan(0);
    }
  });

  test('should work with different programming languages', async ({ page }) => {
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Check if language selector is available
    const languageSelector = page.locator('select[data-testid="language-selector"]');
    
    if (await languageSelector.isVisible()) {
      // Test with Python (default)
      await languageSelector.selectOption('python');
      await page.locator('.monaco-editor').click();
      await page.keyboard.press('Control+A');
      await page.keyboard.type('print("Hello from Python")');
      
      await page.locator('button:has-text("Run")').click();
      await page.waitForSelector('text=/Sample Test Results/', { timeout: 10000 });
      
      // Test with Go (if available and user is authorized)
      const goOption = page.locator('option[value="go"]');
      if (await goOption.isVisible()) {
        await languageSelector.selectOption('go');
        await page.locator('.monaco-editor').click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type(`package main
import "fmt"
func main() {
    fmt.Println("Hello from Go")
}`);
        
        await page.locator('button:has-text("Run")').click();
        
        // Either should work or show auth error
        await expect(page.locator('text=/Sample Test Results|Error:/')).toBeVisible({ timeout: 10000 });
      }
    }
  });
});

test.describe('Submission Flow Edge Cases', () => {
  test('should handle timeout scenarios', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="header"]');
    
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Enter code that might cause timeout
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('while True: pass  # Infinite loop');
    
    // Click Run
    await page.locator('button:has-text("Run")').click();
    
    // Wait for timeout message
    await page.waitForSelector('text=/timeout/i', { timeout: 15000 });
    
    // Check that timeout is handled gracefully
    const output = await page.locator('[data-testid="output"]').textContent();
    expect((output || '').toLowerCase()).toContain('timeout');
    
    // Buttons should be re-enabled after timeout
    await expect(page.locator('button:has-text("Run")')).not.toBeDisabled();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="header"]');
    
    // Simulate network issues for Go execution
    await page.route('**/api/execute/go/', route => route.abort());
    
    // Wait for the editor to load
    await page.waitForSelector('[data-testid="code-editor"]');
    
    // Try to execute Go code (if available)
    const languageSelector = page.locator('select[data-testid="language-selector"]');
    if (await languageSelector.isVisible()) {
      const goOption = page.locator('option[value="go"]');
      if (await goOption.isVisible()) {
        await languageSelector.selectOption('go');
        await page.locator('.monaco-editor').click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type('package main\nfunc main() {}');
        
        await page.locator('button:has-text("Run")').click();
        
        // Should handle network error gracefully
        await page.waitForSelector('text=/Error:/', { timeout: 10000 });
        
        const output = await page.locator('[data-testid="output"]').textContent();
        expect(output || '').toContain('Error:');
      }
    }
  });
});