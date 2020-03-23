module.exports = {
  extends: [
    '../.eslintrc-ts.js',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draftState'] }],


  }
};
