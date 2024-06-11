export default {
    "roots": [
      "<rootDir>/src",
    ],
    "transform": {
      "^.+\\.tsx?$": ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }],
    },
    "testRegex": "(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node",
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}",
    ], 
  }
