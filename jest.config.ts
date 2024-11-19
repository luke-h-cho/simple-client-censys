import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  //for now, just a specific test under the lib, due to test
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    // Map imports to match Remix's structure
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // For mocking CSS imports
    '^~/(.*)$': '<rootDir>/app/$1', // Alias for the app folder
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add setup for Testing Library
};

export default config;
