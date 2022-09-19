/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs-extra';
import path from 'path';

import { format } from './format';
import { compiled } from './fs';

import * as paths from '~/config/paths';

export const fromTemplates = (file: string) => {
  return path.join(paths.templates, file);
};

export const outputTemplate = async (
  templatePath: string,
  outputPath: string,
  templateProps?: Record<string, any>,
  compileProps?: Record<string, any>,
  needFormat?: boolean
) => {
  const filepath = fromTemplates(templatePath);
  const template = compiled(filepath, compileProps || { minimize: false });
  const file = template(templateProps || {});
  const raw = needFormat ? await format(file) : file;
  await fs.outputFile(outputPath, raw);
};
