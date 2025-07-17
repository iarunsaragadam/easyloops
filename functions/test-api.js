const axios = require('axios');

// API endpoints
const BASE_URL = 'https://us-central1-elloloop-easyloops.cloudfunctions.net';
const ENDPOINTS = {
  health: `${BASE_URL}/health`,
  getLanguages: `${BASE_URL}/getLanguages`,
  executeCode: `${BASE_URL}/executeCode`,
  rateLimitStatus: `${BASE_URL}/rateLimitStatus`,
};

// Test data
const testCode = {
  javascript: 'console.log("Hello, World!");',
  python: 'print("Hello, World!")',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
};

async function testHealthEndpoint() {
  console.log('🏥 Testing Health Endpoint...');
  try {
    const response = await axios.get(ENDPOINTS.health);
    console.log('✅ Health Check:', response.data);
    return true;
      } catch (error) {
      console.error(
        '❌ Health Check Failed:',
        error.response?.data || error.message
      );
      return false;
    }
}

async function testGetLanguages() {
  console.log('\n🌐 Testing Get Languages Endpoint...');
  try {
    const response = await axios.get(ENDPOINTS.getLanguages);
    console.log(
      '✅ Languages Retrieved:',
      response.data.count,
      'languages supported'
    );
    console.log('📋 Sample Languages:');
          response.data.languages.slice(0, 3).forEach(lang => {
        console.log(`   - ${lang.name} (${lang.identifier})`);
      });
    return true;
  } catch (error) {
    console.error(
      '❌ Get Languages Failed:',
      error.response?.data || error.message
    );
    return false;
  }
}

async function testExecuteCodeWithoutAuth() {
  console.log('\n🔒 Testing Execute Code Without Authentication...');
  try {
    const response = await axios.post(ENDPOINTS.executeCode, {
      code: testCode.javascript,
      language: 'javascript',
      questionId: 'test-question-123',
    });
    console.log('❌ Should have failed - got response:', response.data);
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly rejected unauthorized request');
      return true;
    } else {
      console.error(
        '❌ Unexpected error:',
        error.response?.data || error.message
      );
      return false;
    }
  }
}

async function testInvalidRequest() {
  console.log('\n🚫 Testing Invalid Request...');
  try {
    const response = await axios.post(ENDPOINTS.executeCode, {
      // Missing required fields
      language: 'javascript',
    });
    console.log('❌ Should have failed - got response:', response.data);
    return false;
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Correctly rejected invalid request');
      return true;
    } else {
      console.error(
        '❌ Unexpected error:',
        error.response?.data || error.message
      );
      return false;
    }
  }
}

async function testUnsupportedLanguage() {
  console.log('\n🚫 Testing Unsupported Language...');
  try {
    const response = await axios.post(ENDPOINTS.executeCode, {
      code: 'print("Hello")',
      language: 'unsupported-language',
      questionId: 'test-question-123',
    });
    console.log('❌ Should have failed - got response:', response.data);
    return false;
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 500) {
      console.log('✅ Correctly rejected unsupported language');
      return true;
    } else {
      console.error(
        '❌ Unexpected error:',
        error.response?.data || error.message
      );
      return false;
    }
  }
}

async function runAllTests() {
  console.log('🚀 Starting API Tests...\n');

  const tests = [
    { name: 'Health Check', fn: testHealthEndpoint },
    { name: 'Get Languages', fn: testGetLanguages },
    { name: 'Unauthorized Access', fn: testExecuteCodeWithoutAuth },
    { name: 'Invalid Request', fn: testInvalidRequest },
    { name: 'Unsupported Language', fn: testUnsupportedLanguage },
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    const result = await test.fn();
    if (result) passed++;
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);

  if (passed === total) {
    console.log('\n🎉 All tests passed! The API is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the implementation.');
  }

  console.log('\n📝 Next Steps:');
  console.log(
    '1. To test authenticated code execution, you need a Firebase ID token'
  );
  console.log(
    '2. Set up a Judge0 instance and configure the JUDGE0_BASE_URL environment variable'
  );
  console.log(
    '3. Test with real code execution using the frontend application'
  );
}

// Run tests
runAllTests().catch(console.error);
