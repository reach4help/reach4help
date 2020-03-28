module.exports = {
  extends: [
    '../.eslintrc-ts.js',
    "prettier/react",
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
    "react",
    "prettier",
    "react-hooks",
    "prefer-arrow"
  ],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "max-len": ["error", { "code": 150, "ignorePattern": "^import.*/|className=" }],
    "no-trailing-spaces": ["error", { "ignoreComments": true }],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "tsx", "ts"] }],
    "react/jsx-indent": ["error", 2, { "checkAttributes": true }],
    "import/order": ["off"],
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": true,
      "memberSyntaxSortOrder": ["none", "single", "multiple", "all"]
    }],
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
    "jsx-a11y/label-has-for": "off",
    "react/jsx-props-no-spreading": "off",
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1, "maxBOF": 0 }],
    "eol-last": ["error", "always"],
    "arrow-spacing": "error",
    "react/jsx-props-no-multi-spaces": "error",
    "operator-linebreak": [2, "before", { "overrides": { "?": "after" } }],
    "no-multi-spaces": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "keyword-spacing": "error",
    "react/jsx-tag-spacing": "error",
    "space-infix-ops": "error",
    "key-spacing": ["error", { "beforeColon": false }],
    "space-before-blocks": "error",
    "arrow-body-style": ["error", "as-needed"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "comma-dangle": "error",
    "dot-notation": "error",
    "no-console": "error",
    "object-curly-spacing": "error",
    "no-param-reassign": ["error", {
      "props": true,
      "ignorePropertyModificationsFor": ["draft", "draftState", "state", "sum"]
    }
    ],
    "no-plusplus": "off",
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }
    ],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "react/jsx-boolean-value": ["error", "never"],
    "react/no-unknown-property": "error",
    "react/prop-types": "off",
    "react/sort-comp": "error",
    "react/require-default-props": "off",
    "sort-vars": "error",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        "disallowPrototype": true,
        "singleReturnOnly": false,
        "classPropertiesAllowed": false
      }
    ]
  }
};
