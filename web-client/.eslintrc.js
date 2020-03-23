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
  plugins: [
    "import-helpers",
  ],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "import-helpers/order-imports": ["error", {
      "newlinesBetween": "always",
      "groups": [
        "/^@testing-library/",
        "module",
        ["parent", "sibling", "index"],
        "/css$/"
      ],
      "alphabetize": { "order": "asc", "ignoreCase": true }
    }
    ],
  }
};
