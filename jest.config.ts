import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/entities/**/*.test.ts'], // Ajuste o caminho conforme necessário
  moduleFileExtensions: ['ts', 'js'],
};

export default config;
