module.exports = {
  extends: [
    '.eslintrc.js',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
    'import-helpers',
    'prettier',
    'react-hooks',
    'prefer-arrow',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/no-unbound-method': [0],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
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

    semi: ['error', 'always'],
    quotes: ['error', 'single', { "avoidEscape": true }],
    'max-len': ['error', { code: 150, ignorePattern: '^import.*/|className=' }],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'tsx', 'ts'] },
    ],
    'react/jsx-indent': ['error', 2, { checkAttributes: true }],
    'import/order': ['off'],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'single', 'multiple', 'all'],
      },
    ],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          '/^@testing-library/',
          'module',
          ['parent', 'sibling', 'index'],
          '/css$/',
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'jsx-a11y/label-has-for': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'eol-last': ['error', 'always'],
    'arrow-spacing': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'no-multi-spaces': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'keyword-spacing': 'error',
    'react/jsx-tag-spacing': 'error',
    'space-infix-ops': 'error',
    'key-spacing': ['error', { beforeColon: false }],
    'space-before-blocks': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'comma-dangle': 'error',
    'dot-notation': 'error',
    'no-console': 'error',
    'object-curly-spacing': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['draft', 'draftState', 'state', 'sum'],
      },
    ],
    'no-plusplus': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/no-unknown-property': 'error',
    'react/prop-types': 'off',
    'react/sort-comp': 'error',
    'react/require-default-props': 'off',
    'sort-vars': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'no-multi-assign': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
};
