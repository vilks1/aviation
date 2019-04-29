import fs from 'fs';

export const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
};
