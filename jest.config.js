/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['.js'],
  "transform": {
    "^.+\\.(mt|t|cj|j)s$": [
      "ts-jest",
      {
        "useESM": true
      }
    ]
  },
};
