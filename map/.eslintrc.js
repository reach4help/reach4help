module.exports = {
  extends: ['../.eslintrc-ts.js'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.mjs'],
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    es6: true,
  },
  /*
   * DO NOT SPECIFY RULES OR PLUGINS IN THIS FILE UNLESS THEY SHOULD ONLY
   * APPLY TO THE functions DIRECTORY, AND NOTHING ELSE!!!
   */
  plugins: [
    'prefer-arrow',
    // see ../.eslintrc-ts.js
  ],
  rules: {
    // see ../.eslintrc-ts.js
    /**
     * Conflicts with prettier indentation for jsx attributes on own line
     */
    'react/jsx-indent': 'off',
    'react/display-name': 'off',
    'no-underscore-dangle': 'off',
  },
};
