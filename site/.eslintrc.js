module.exports = {
  extends: ['../.eslintrc.js'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    // TODO: Off while we get started
    'no-unused-vars': 'off',
  },
};
