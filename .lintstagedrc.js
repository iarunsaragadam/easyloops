module.exports = {
  // Run ESLint on JavaScript and TypeScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],

  // Format various file types with Prettier
  '*.{js,jsx,ts,tsx,json,css,md}': ['prettier --write'],

  // Type checking will be handled by the Husky pre-commit hook separately
  // since it needs to run on the entire project, not just staged files
};
