import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../public/questions');

function getTestCasesForQuestion(questionDir) {
  const files = fs.readdirSync(questionDir);
  const inputFiles = files.filter((f) => /^input(\d*)\.txt$/.test(f));
  const testCases = inputFiles.map((inputFile) => {
    const match = inputFile.match(/^input(\d*)\.txt$/);
    const idx = match[1] ? match[1] : '';
    const expectedFile = `expected${idx}.txt`;
    return {
      inputFile,
      expectedFile,
      description: `Test Case ${idx === '' ? 1 : idx}`,
    };
  });
  return testCases;
}

function generateManifests() {
  const questionFolders = fs
    .readdirSync(QUESTIONS_DIR)
    .filter((f) => fs.statSync(path.join(QUESTIONS_DIR, f)).isDirectory());
  questionFolders.forEach((folder) => {
    const questionDir = path.join(QUESTIONS_DIR, folder);
    const testCases = getTestCasesForQuestion(questionDir);
    const manifestPath = path.join(questionDir, 'testcases.json');
    fs.writeFileSync(manifestPath, JSON.stringify(testCases, null, 2));
    console.log(`Generated ${manifestPath} (${testCases.length} test cases)`);
  });
}

generateManifests();
