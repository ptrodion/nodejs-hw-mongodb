import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username must be at most {#limit} characters long',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{1,3}\d{8,12}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be in the format +[country code][number], e.g., +351698798000',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of: work, home, or personal',
  }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username must be at most {#limit} characters long',
  }),
  phoneNumber: Joi.string()
    .optional()
    .pattern(/^\+\d{1,3}\d{8,12}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be in the format +[country code][number], e.g., +351698798000',
      'string.base': 'Phone number should be a string',
    }),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of: work, home, or personal',
  }),
});
