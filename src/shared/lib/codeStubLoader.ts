import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '@/shared/constants/languages';

// Language-specific file mappings
const LANGUAGE_FILE_MAP = {
  python: 'main.py',
  go: 'main.go',
  c: 'main.c',
  cpp: 'main.cpp',
  javascript: 'main.js',
  java: 'Main.java',
  rust: 'main.rs',
} as const;

// Default code templates for each language
const DEFAULT_TEMPLATES = {
  python: `"""
TODO: Implement your solution here.

This is the main function you need to complete.
Read input using input() and print output using print().

Example:
    line = input().strip()  # Read a line
    n = int(input())        # Read an integer
    arr = list(map(int, input().split()))  # Read space-separated integers
    print(result)           # Print your result
"""

def solve():
    # TODO: Implement your solution here
    pass

if __name__ == "__main__":
    solve()`,

  go: `package main

import (
    "fmt"
    "os"
    "bufio"
    "strconv"
)

func solve() {
    // TODO: Implement your solution here
    scanner := bufio.NewScanner(os.Stdin)
    
    // Example: Read a line
    // scanner.Scan()
    // line := scanner.Text()
    
    // Example: Read an integer
    // scanner.Scan()
    // n, _ := strconv.Atoi(scanner.Text())
    
    // Example: Read space-separated integers
    // scanner.Scan()
    // parts := strings.Fields(scanner.Text())
    // arr := make([]int, len(parts))
    // for i, part := range parts {
    //     arr[i], _ = strconv.Atoi(part)
    // }
    
    // Print your result
    // fmt.Println(result)
}

func main() {
    solve()
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void solve() {
    // TODO: Implement your solution here
    
    // Example: Read an integer
    // int n;
    // scanf("%d", &n);
    
    // Example: Read a string
    // char line[1000];
    // scanf("%s", line);
    
    // Print your result
    // printf("%d\\n", result);
}

int main() {
    solve();
    return 0;
}`,

  cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

void solve() {
    // TODO: Implement your solution here
    
    // Example: Read an integer
    // int n;
    // cin >> n;
    
    // Example: Read a string
    // string line;
    // getline(cin, line);
    
    // Example: Read space-separated integers
    // string line;
    // getline(cin, line);
    // istringstream iss(line);
    // vector<int> arr;
    // int num;
    // while (iss >> num) {
    //     arr.push_back(num);
    // }
    
    // Print your result
    // cout << result << endl;
}

int main() {
    solve();
    return 0;
}`,

  javascript: `/**
 * TODO: Implement your solution here.
 * 
 * This is the main function you need to complete.
 * Use process.stdin to read input and console.log to print output.
 */

function solve() {
    // TODO: Implement your solution here
    
    // Example: Read input
    // const input = require('fs').readFileSync(0, 'utf-8').trim();
    // const lines = input.split('\\n');
    // const n = parseInt(lines[0]);
    // const arr = lines[1].split(' ').map(Number);
    
    // Print your result
    // console.log(result);
}

// Handle input reading
let input = '';
process.stdin.on('data', chunk => {
    input += chunk;
});

process.stdin.on('end', () => {
    solve();
});`,

  java: `import java.util.*;
import java.io.*;

public class Main {
    public static void solve() {
        // TODO: Implement your solution here
        Scanner scanner = new Scanner(System.in);
        
        // Example: Read an integer
        // int n = scanner.nextInt();
        
        // Example: Read a string
        // String line = scanner.nextLine();
        
        // Example: Read space-separated integers
        // String[] parts = scanner.nextLine().split(" ");
        // int[] arr = new int[parts.length];
        // for (int i = 0; i < parts.length; i++) {
        //     arr[i] = Integer.parseInt(parts[i]);
        // }
        
        // Print your result
        // System.out.println(result);
        
        scanner.close();
    }
    
    public static void main(String[] args) {
        solve();
    }
}`,

  rust: `use std::io;

fn solve() {
    // TODO: Implement your solution here
    
    // Example: Read a line
    // let mut input = String::new();
    // io::stdin().read_line(&mut input).unwrap();
    // let line = input.trim();
    
    // Example: Read an integer
    // let mut input = String::new();
    // io::stdin().read_line(&mut input).unwrap();
    // let n: i32 = input.trim().parse().unwrap();
    
    // Example: Read space-separated integers
    // let mut input = String::new();
    // io::stdin().read_line(&mut input).unwrap();
    // let arr: Vec<i32> = input
    //     .trim()
    //     .split_whitespace()
    //     .map(|s| s.parse().unwrap())
    //     .collect();
    
    // Print your result
    // println!("{}", result);
}

fn main() {
    solve();
}`,
} as const;

/**
 * Loads code stub for a specific language and question.
 * First tries to load from question-specific file, then falls back to default template.
 *
 * @param questionId - The ID of the question (e.g., '01-variable-declaration')
 * @param language - The programming language (e.g., 'python', 'go', 'c')
 * @returns Promise that resolves to the code stub string
 */
export async function loadCodeStub(
  questionId: string,
  language: SupportedLanguage
): Promise<string> {
  // Validate language
  const supportedLanguages = SUPPORTED_LANGUAGES.map((lang) => lang.value);
  if (!supportedLanguages.includes(language)) {
    console.warn(`Unsupported language: ${language}. Using default template.`);
    return getDefaultTemplate(language);
  }

  // Try to load language-specific file from question folder
  let fileName: string | undefined;
  if (Object.prototype.hasOwnProperty.call(LANGUAGE_FILE_MAP, language)) {
    const langKey = language as keyof typeof LANGUAGE_FILE_MAP;
    fileName = LANGUAGE_FILE_MAP[langKey];
  }
  if (fileName) {
    try {
      const response = await fetch(`/questions/${questionId}/${fileName}`);
      if (response.ok) {
        const codeStub = await response.text();
        // Only return if the file has actual content (not just whitespace)
        if (codeStub.trim().length > 0) {
          console.log(
            `✅ Loaded code stub from /questions/${questionId}/${fileName}`
          );
          return codeStub;
        }
      }
    } catch {
      console.log(
        `ℹ️ No question-specific stub found for ${language} in ${questionId}, using default template`
      );
    }
  }

  // Fall back to default template
  const defaultTemplate = getDefaultTemplate(language);
  console.log(`📝 Using default template for ${language}`);
  return defaultTemplate;
}

/**
 * Gets the default template for a programming language.
 *
 * @param language - The programming language
 * @returns The default code template for the language
 */
function getDefaultTemplate(language: string): string {
  const validLanguages = Object.keys(
    DEFAULT_TEMPLATES
  ) as (keyof typeof DEFAULT_TEMPLATES)[];
  if (validLanguages.includes(language as keyof typeof DEFAULT_TEMPLATES)) {
    return DEFAULT_TEMPLATES[language as keyof typeof DEFAULT_TEMPLATES];
  }
  return DEFAULT_TEMPLATES.python;
}

/**
 * Loads code stubs for all supported languages for a given question.
 * Useful for preloading when switching between languages.
 *
 * @param questionId - The ID of the question
 * @returns Promise that resolves to a map of language -> code stub
 */
export async function loadAllCodeStubs(
  questionId: string
): Promise<Record<string, string>> {
  const supportedLanguages = SUPPORTED_LANGUAGES.map((lang) => lang.value);
  const codeStubs: Record<string, string> = {};

  // Load all code stubs in parallel
  const promises = supportedLanguages.map(async (language) => {
    const codeStub = await loadCodeStub(questionId, language);
    codeStubs[language] = codeStub;
  });

  await Promise.all(promises);
  return codeStubs;
}

/**
 * Checks if a question has language-specific stub files.
 *
 * @param questionId - The ID of the question
 * @returns Promise that resolves to a map of language -> boolean indicating if stub exists
 */
export async function getAvailableStubs(
  questionId: string
): Promise<Record<string, boolean>> {
  const supportedLanguages = SUPPORTED_LANGUAGES.map((lang) => lang.value);
  const availability: Record<string, boolean> = {};

  // Check each language in parallel
  const promises = supportedLanguages.map(async (language) => {
    let fileName: string | undefined;
    if (Object.prototype.hasOwnProperty.call(LANGUAGE_FILE_MAP, language)) {
      const langKey = language as keyof typeof LANGUAGE_FILE_MAP;
      fileName = LANGUAGE_FILE_MAP[langKey];
    }
    if (fileName) {
      try {
        const response = await fetch(`/questions/${questionId}/${fileName}`);
        const hasStub =
          response.ok && (await response.text()).trim().length > 0;
        availability[language] = hasStub;
      } catch {
        availability[language] = false;
      }
    } else {
      availability[language] = false;
    }
  });

  await Promise.all(promises);
  return availability;
}
