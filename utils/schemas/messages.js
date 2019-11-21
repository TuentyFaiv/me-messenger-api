const joi = require('@hapi/joi');

const messageIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const messageInChatSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const messageAddresseeSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const messageSenderSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const messageTypeSchema = joi.string();
const messageContentSchema = joi.string();
const messageCreatedAtSchema = joi.date();
const messageEditedAtSchema = joi.date();

const createMessageSchema = {
  inChat: messageInChatSchema.required(),
  from: messageSenderSchema.required(),
  to: messageAddresseeSchema.required(),
  type: messageTypeSchema,
  content: messageContentSchema.required(),
  created_at: messageCreatedAtSchema.required(),
  updated_at: messageEditedAtSchema
};

const updateMessageSchema = {
  inChat: messageInChatSchema,
  from: messageSenderSchema,
  to: messageAddresseeSchema,
  type: messageTypeSchema,
  content: messageContentSchema,
  created_at: messageCreatedAtSchema,
  updated_at: messageEditedAtSchema.required()
};

module.exports = {
  messageIdSchema,
  createMessageSchema,
  updateMessageSchema
};