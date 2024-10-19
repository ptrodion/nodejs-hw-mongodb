import createHttpError from 'http-errors';

export function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    console.log('TYTY', typeof error);

    if (typeof error !== 'undefined') {
      console.log(error.details);

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
