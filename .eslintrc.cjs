// .eslintrc.js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'playwright'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:playwright/recommended',
      'plugin:prettier/recommended'
    ],
    env: {
      node: true,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  };
  