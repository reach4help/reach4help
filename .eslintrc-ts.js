module.exports = {
  extends: [
    '.eslintrc.js',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    "@typescript-eslint/interface-name-prefix": 'off',
    'import/no-unresolved': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-restricted-syntax': 'off',
    'react/no-array-index-key': 'off',
    'import/prefer-default-export': 'off',
    // consistent-return is uneccesary for typescript and encourages you to
    // write uneccesary return statements instead of return types
    'consistent-return': 'off',
    // Accessibility Disabled for now
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    }
  }
};
