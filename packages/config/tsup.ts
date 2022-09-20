import { config } from 'dotenv';
import path from 'path';

config();

export default (_options: any, { withReact }: any = {}) => ({
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: false,
  external: ['esbuild'],
  minify: process.env.NODE_ENV === 'production',
  ...(withReact && { inject: [path.resolve(__dirname, './react-imports.js')] }),
});
