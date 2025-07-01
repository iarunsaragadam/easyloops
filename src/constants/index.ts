export const DEFAULT_CODE = `# Nested Loops - Right Triangle Pattern
# Read the number of rows
n = int(input())

# Outer loop: iterate through rows (1 to n)
for i in range(1, n + 1):
    # Inner loop: print stars for current row
    for j in range(i):
        print("*", end="")
    print()  # Move to next line after each row`;

export const LAYOUT_CONSTANTS = {
  DEFAULT_LEFT_PANE_WIDTH: 40,
  DEFAULT_TEST_RESULTS_HEIGHT: 0.5,
  MIN_LEFT_PANE_WIDTH: 20,
  MAX_LEFT_PANE_WIDTH: 80,
  MIN_TEST_RESULTS_HEIGHT: 0,
  MAX_TEST_RESULTS_HEIGHT: 400,
} as const;

export const PYODIDE_CONFIG = {
  CDN_URL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js",
  INDEX_URL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
} as const;

export const MONACO_CONFIG = {
  CDN_URL: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js",
  VS_PATH: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs",
} as const;

export const DEFAULT_QUESTION_ID = "01-variable-declaration";

export const SUPPORTED_LANGUAGES = [
  { value: "python", label: "Python3" },
  { value: "go", label: "Go" },
] as const;

// Firebase configuration for elloloop-easyloops project
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA32EoTmr7nRaq26rDBbIjPNDxOMX5g0B8",
  authDomain: "elloloop-easyloops.firebaseapp.com",
  projectId: "elloloop-easyloops",
  storageBucket: "elloloop-easyloops.firebasestorage.app",
  messagingSenderId: "785642431768",
  appId: "1:785642431768:web:289ffa24f524cc5849ea6d",
};

// Backend configuration
export const BACKEND_CONFIG = {
  URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
  HEALTH_CHECK: "/health",
  GO_EXECUTION: "/api/execute/go",
};
