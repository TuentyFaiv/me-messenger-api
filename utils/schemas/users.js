const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(100);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string();

const userSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required()
};

const createUserSchema = {
  ...userSchema,
  isAdmin: joi.boolean()
};

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required()
};

module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema
};