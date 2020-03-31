module.exports = {
  extends: ['../.eslintrc-ts.js'],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'react/jsx-one-expression-per-line': 'off',
  },
};
