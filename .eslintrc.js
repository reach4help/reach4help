module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:cypress/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    curly: [2, 'all'],
    'brace-style': [2, '1tbs'],
  },
};
