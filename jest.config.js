module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  testPathIgnorePatterns: ['node_modules/', 'webviews/'],
};
