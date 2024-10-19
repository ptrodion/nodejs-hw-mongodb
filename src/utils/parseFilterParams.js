const parseBoolean = (value) => {
  if (typeof value !== 'string') {
    return undefined;
  }

  if (value.toLowerCase() === 'true') {
    return true;
  } else if (value.toLowerCase() === 'false') {
    return false;
  }

  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = type ? type.trim() : undefined;
  const parsedisFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedisFavourite,
  };
};
