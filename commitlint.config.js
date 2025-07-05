module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Customize rules if needed
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
};
