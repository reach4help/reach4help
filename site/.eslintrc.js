module.exports = {
  extends: ["../.eslintrc.js"],
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "import/no-unresolved": "off", // eslint doesn't get absolute imports
    "import/prefer-default-export": "off", // not really necessary
  },
}
