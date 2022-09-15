/* eslint-disable import/no-relative-packages */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup';

import baseConfig from '../config/tsup';

export default defineConfig((options) => ({
  ...baseConfig(options),
  entry: ['src/index.ts', 'src/bin.ts'],
}));
