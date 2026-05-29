import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  outDir: 'dist',
  clean: true,
  dts: true,
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
