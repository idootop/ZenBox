import { config } from '@del-wang/config/tsdown';
import { defineConfig } from 'tsdown';

export default defineConfig({
  ...config,
  platform: 'browser',
  entry: [
    './src/**/*.ts',
    './src/**/*.tsx',
    '!./src/**/*.test.ts',
    '!./src/**/*.test.tsx',
  ],
  // format: 'esm',
  // noExternal: [/.*/],
});
