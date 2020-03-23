module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:cypress/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'curly': [2, 'all'],
    'brace-style': [2, '1tbs'],
  }
};
