import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const sanitizedFilename = '_' + file.originalname.replace(/ /g, '_');
    cb(null, `${uniqueSuffix}_${sanitizedFilename}`);
  },
});

export const upload = multer({ storage });
