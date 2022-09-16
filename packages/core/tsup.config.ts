/* eslint-disable import/no-relative-packages */
/* eslint-disable import/no-extraneous-dependencies */
import chokidar from 'chokidar';
import fs from 'fs-extra';
import { resolve } from 'path';
import { defineConfig } from 'tsup';

import baseConfig from '../config/tsup';

export default defineConfig((options) => ({
  ...baseConfig(options),
  clean: true,
  platform: 'node',
  format: ['esm'],
  external: ['typescript'],
  target: 'es2022',
  entry: {
    index: 'src/index.ts',
    astro: 'src/astro.ts',
  },
  async onSuccess() {
    const watcher = chokidar.watch('./templates/*', {
      persistent: true,
    });

    function generate() {
      fs.copySync(
        resolve(__dirname, 'templates'),
        resolve(__dirname, 'dist/templates')
      );
    }

    watcher.on('change', generate);
    watcher.on('add', generate);
  },
}));
