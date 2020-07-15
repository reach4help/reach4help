module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tests/tsconfig.json'
    }
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
