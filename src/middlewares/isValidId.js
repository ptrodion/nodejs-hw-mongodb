import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidID(req, _res, next) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(createHttpError(400, 'ID is not valid'));
  }

  next();
}
