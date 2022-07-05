module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
  jest: { setupFiles: ["<rootDir>/jestSetupFile.js"] },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx", "!src/**/*.spec.tsx"],
  coverageReporters: ["lcov"],
};
