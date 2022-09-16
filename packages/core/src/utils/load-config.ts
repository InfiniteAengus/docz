/* eslint-disable @typescript-eslint/no-explicit-any */
import JoyCon from 'joycon';
import _ from 'lodash';
import path from 'path';

export const finds = (name: string): string[] => [
  `${name}.json`,
  `.${name}rc`,
  `${name}rc.js`,
  `${name}rc.json`,
  `${name}.config.js`,
  `${name}.config.json`,
];

async function loadConfigFilePath(files: string[], name: string, cwd: string) {
  const configJoycon = new JoyCon();
  return configJoycon.load({
    cwd,
    files,
    stopDir: path.parse(cwd).root,
    packageKey: name,
  });
}

export async function load<C = any>(
  name: string,
  defaultConfig: C,
  cwd: string
) {
  const config = await loadConfigFilePath(finds(name), name, cwd);
  return _.merge(config?.data ?? {}, defaultConfig);
}

export async function loadFrom<C = any>(
  name: string,
  filepath: string,
  defaultConfig: C,
  cwd: string
) {
  const config = await loadConfigFilePath([filepath], name, cwd);
  return _.merge(config?.data ?? {}, defaultConfig);
}
