const joi = require('@hapi/joi');

const contactIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const contactContactOFSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const contactUserContactIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const contactNameSchema = joi.string().max(80);
const contactRoleSchema = joi.string().max(120);

const createContactSchema = {
  contactOf: contactContactOFSchema.required(),
  userContactId: contactUserContactIdSchema.required(),
  name: contactNameSchema.required(),
  role: contactRoleSchema.required()
};

const updateContactSchema = {
  contactOf: contactContactOFSchema,
  userContactId: contactUserContactIdSchema,
  name: contactNameSchema,
  role: contactRoleSchema
};

module.exports = {
  contactIdSchema,
  createContactSchema,
  updateContactSchema
};