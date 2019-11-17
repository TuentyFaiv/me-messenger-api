const joi = require('@hapi/joi');

const chatIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const chatTitleSchema = joi.string().max(80);
const chatMembersSchema = joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/).required());
const chatTypeSchema = joi.array().items(joi.string().max(50));
const chatMessagesSchema = joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/));
const chatCreatedAtSchema = joi.date();
const chatEditedAtSchema = joi.date();

const createChatSchema = {
  title: chatTitleSchema.required(),
  members: chatMembersSchema.required(),
  type: chatTypeSchema.required(),
  messages: chatMessagesSchema,
  created_at: chatCreatedAtSchema.required(),
  updated_at: chatEditedAtSchema
};

const updateChatSchema = {
  title: chatTitleSchema,
  members: chatMembersSchema,
  type: chatTypeSchema,
  messages: chatMessagesSchema,
  created_at: chatCreatedAtSchema,
  updated_at: chatEditedAtSchema.required()
};

module.exports = {
  chatIdSchema,
  createChatSchema,
  updateChatSchema
};