import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (filename) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, filename),
    path.join(UPLOAD_DIR, filename),
  );

  return ` ${'http://localhost:3000'}/uploads/${filename}`;
};
