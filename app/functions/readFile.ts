import fs from 'fs';

export default (filePath: string) => {
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
};
