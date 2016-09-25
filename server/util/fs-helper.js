/**
 * Created by slava on 25.09.16.
 */

import fs from 'fs';

export const createDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};