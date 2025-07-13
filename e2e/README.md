# E2E Test Suite Documentation

This directory contains comprehensive end-to-end tests for the EasyLoops coding application. The tests cover the complete user workflow from question selection to code execution and result verification.

## Test Files Overview

### 1. `basic.spec.ts` - Basic Application Tests
- **Purpose**: Tests fundamental application loading and basic UI components
- **Coverage**:
  - Application loading and main elements visibility
  - Code editor presence and functionality
  - Language selection functionality
  - Question selector functionality
  - Authentication button presence
  - Layout state persistence

### 2. `code-execution.spec.ts` - Core Code Execution Flow
- **Purpose**: Tests the complete user workflow for code execution
- **Coverage**:
  - **Passing Test Cases**: User selects question, writes correct code, runs it, sees passing results
  - **Failing Test Cases**: User selects question, writes incorrect code, runs it, sees failing results
  - **Mixed Results**: Tests with some passing and some failing test cases
  - **Language Switching**: Tests switching between Python and Go (if authorized)
  - **Error Handling**: Tests syntax errors and runtime errors
  - **Multiple Runs**: Tests running code multiple times with different inputs
  - **Loading States**: Tests UI feedback during code execution

### 3. `advanced-execution.spec.ts` - Advanced Execution Scenarios
- **Purpose**: Tests edge cases and advanced scenarios
- **Coverage**:
  - **Multiple Test Cases**: Tests questions with multiple test cases (all passing, some failing)
  - **Runtime Errors**: Tests graceful handling of runtime errors
  - **Timeout Handling**: Tests long-running code timeout scenarios
  - **Empty Code**: Tests running empty code
  - **Detailed Test Results**: Tests detailed test case information display
  - **Question Switching**: Tests switching questions during execution
  - **Language Preservation**: Tests code preservation when switching languages
  - **Concurrent Execution**: Tests handling multiple rapid run button clicks

### 4. `ui-interactions.spec.ts` - UI and Visual Feedback Tests
- **Purpose**: Tests user interface interactions and visual feedback
- **Coverage**:
  - **Loading States**: Tests proper loading indicators during execution
  - **Visual Indicators**: Tests checkmarks, X marks, and status indicators
  - **Console Output**: Tests proper formatting of console output
  - **Resizable Panels**: Tests layout and panel functionality
  - **Error Styling**: Tests error message display and styling
  - **Navigation**: Tests question navigation and state management
  - **Responsive Design**: Tests different screen sizes and mobile compatibility
  - **Accessibility**: Tests keyboard shortcuts and accessibility features
  - **Theme Support**: Tests theme switching functionality (if available)

## Test Scenarios Covered

### Core User Workflow
1. **Select Question**: User clicks question dropdown and selects a question
2. **Write Code**: User writes code in the Monaco editor
3. **Execute Code**: User clicks the Run button
4. **View Results**: User sees console output and test case results

### Test Result Scenarios
- ✅ **All Tests Pass**: Code produces correct output for all test cases
- ❌ **All Tests Fail**: Code produces incorrect output for all test cases
- ⚠️ **Mixed Results**: Some test cases pass, others fail
- 🚫 **Runtime Errors**: Code has syntax or runtime errors
- ⏱️ **Timeout**: Code takes too long to execute

### Question Types Tested
- **Variable Declaration** (`01-variable-declaration`): Tests basic variable handling
- **If/Else Statements** (`09-if-else-statements`): Tests conditional logic with multiple test cases

## Improved Question Content

### Enhanced If/Else Statements Question
- **Improved Description**: More comprehensive problem statement with clear requirements
- **Multiple Test Cases**: Added test cases for negative numbers, zero, and positive numbers
- **Better Examples**: Included both Python and Go implementation examples
- **Enhanced Hints**: Added specific hints about edge cases and best practices

### New Test Cases Added
- `input3.txt`: Tests positive even numbers (42)
- `expected3.txt`: Expected output for positive even numbers
- Updated question description with comprehensive examples

## Running the Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Running All E2E Tests
```bash
# Run all e2e tests
npm run test:e2e

# Run tests in headed mode (visible browser)
npm run test:e2e -- --headed

# Run tests with UI (interactive mode)
npm run test:e2e -- --ui
```

### Running Specific Test Files
```bash
# Run only basic tests
npx playwright test e2e/basic.spec.ts

# Run only code execution tests
npx playwright test e2e/code-execution.spec.ts

# Run only advanced execution tests
npx playwright test e2e/advanced-execution.spec.ts

# Run only UI interaction tests
npx playwright test e2e/ui-interactions.spec.ts
```

### Running Specific Test Cases
```bash
# Run a specific test by name
npx playwright test -g "should complete full workflow with passing test cases"

# Run tests for a specific scenario
npx playwright test -g "failing test cases"
```

### Debug Mode
```bash
# Run in debug mode
npx playwright test --debug

# Run specific test in debug mode
npx playwright test e2e/code-execution.spec.ts --debug
```

## Test Configuration

### Browser Configuration
The tests run on multiple browsers as configured in `playwright.config.ts`:
- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

### Timeouts
- **Default timeout**: 30 seconds
- **Code execution timeout**: 10-15 seconds
- **UI interaction timeout**: 5 seconds

### Test Data
Tests use the actual question data from `public/questions/` directory:
- Input files: `input.txt`, `input2.txt`, `input3.txt`
- Expected output files: `expected.txt`, `expected2.txt`, `expected3.txt`
- Test case configuration: `testcases.json`

## Common Test Patterns

### Question Selection Pattern
```typescript
await page.click('button[aria-label="Select question"]');
await page.waitForSelector('text="Question Name"');
await page.click('text="Question Name"');
await page.waitForSelector('text="Question Name"');
```

### Code Writing Pattern
```typescript
const codeEditor = page.locator('.monaco-editor');
await page.click('.monaco-editor');
await page.keyboard.press('Control+A');
await page.keyboard.type(`def solve():
    # Your code here
    pass

solve()`);
```

### Code Execution Pattern
```typescript
const runButton = page.getByRole('button', { name: '✅ Run' });
await runButton.click();
await page.waitForSelector('text="Console Output"', { timeout: 10000 });
```

### Result Verification Pattern
```typescript
// Check console output
await expect(page.locator('text="Expected Output"')).toBeVisible();

// Check test results
await expect(page.locator('text="Test Results"')).toBeVisible();
await expect(page.locator('text="✅"')).toBeVisible(); // Passing
await expect(page.locator('text="❌"')).toBeVisible(); // Failing
```

## Troubleshooting

### Common Issues
1. **Test Timeout**: Increase timeout in test configuration
2. **Element Not Found**: Check if selectors match the actual UI
3. **Network Issues**: Ensure development server is running
4. **Browser Issues**: Try running in headed mode to see what's happening

### Debug Tips
1. Use `--headed` flag to see browser actions
2. Add `await page.pause()` to stop execution at specific points
3. Use `--debug` flag for step-by-step debugging
4. Check browser console for JavaScript errors

### Environment Setup
```bash
# Verify Playwright installation
npx playwright --version

# Install browsers if needed
npx playwright install

# Check system requirements
npx playwright doctor
```

## Contributing

### Adding New Tests
1. Create test file in `e2e/` directory
2. Follow existing naming conventions
3. Include comprehensive test descriptions
4. Add proper assertions and error handling
5. Update this README with new test information

### Test Best Practices
- Use descriptive test names
- Include step-by-step comments
- Add proper wait conditions
- Handle both success and failure cases
- Test edge cases and error conditions
- Use page object patterns for complex scenarios

### Code Quality
- Follow existing code style
- Add proper TypeScript types
- Include error handling
- Use meaningful variable names
- Add comments for complex logic

## Continuous Integration

The tests are configured to run in CI/CD pipelines with:
- Parallel execution for faster results
- Retry on failure for flaky tests
- HTML reports for detailed results
- Video recording on failure
- Screenshot capture on failure

## Reporting

### HTML Reports
```bash
# Generate HTML report
npm run test:e2e -- --reporter=html

# Open HTML report
npx playwright show-report
```

### Custom Reports
Tests generate detailed reports including:
- Test execution times
- Screenshots of failures
- Video recordings of failing tests
- Console logs and network activity
- Test coverage information

## Future Enhancements

Planned improvements for the test suite:
1. **Performance Testing**: Add tests for application performance
2. **Mobile Testing**: Enhanced mobile device testing
3. **Accessibility Testing**: Comprehensive accessibility compliance
4. **Security Testing**: Basic security vulnerability testing
5. **Integration Testing**: Tests with real backend services
6. **Load Testing**: Multiple user simulation
7. **Cross-browser Testing**: Extended browser compatibility testing