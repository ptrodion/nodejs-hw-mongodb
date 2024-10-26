import createHttpError from 'http-errors';

export function validateBody(schema) {
  return (req, _res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (typeof error !== 'undefined') {
      return next(
        createHttpError(
          400,
          error.details.map((err) => err.message.replace(/"/g, '')).join(', '),
        ),
      );
    }
    next();
  };
}
