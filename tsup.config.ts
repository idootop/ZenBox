import { config } from '@del-wang/config/tsup';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...config,
  platform: 'browser',
  entry: [
    './src/**/*.ts',
    './src/**/*.tsx',
    '!./src/**/*.test.ts',
    '!./src/**/*.test.tsx',
  ],
});
