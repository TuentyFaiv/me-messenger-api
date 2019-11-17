const express = require('express');
const passport = require('passport');
const MessagesService = require('../services/messages');

const {
  messageIdSchema,
  createMessageSchema,
  updateMessageSchema
} = require('../utils/schemas/messages');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function messageApi(app) {
  const router = express.Router();
  app.use('/api/messages', router);

  const messagesService = new MessagesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:messages']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;
      try {
        const messages = await messagesService.getMessages({ tags });
        res.status(200).json({
          data: messages,
          message: 'messages listed'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:messageId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:messages']),
    validationHandler({ messageId: messageIdSchema }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { messageId } = req.params;

      try {
        const message = await messagesService.getMessage({ messageId });

        res.status(200).json({
          data: message,
          message: 'message retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:messages']),
    validationHandler(createMessageSchema),
    async function (req, res, next) {
      const { body: message } = req;

      try {
        const createMessageId = await messagesService.createMessage({ message });
        res.status(201).json({
          data: createMessageId,
          message: 'message created'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:messageId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:messages']),
    validationHandler({ messageId: messageIdSchema }, 'params'),
    validationHandler(updateMessageSchema),
    async function (req, res, next) {
      const { messageId } = req.params;
      const { body: message } = req;
      try {
        const updateMessageId = await messagesService.updateMessage({
          messageId,
          message
        });
        res.status(200).json({
          data: updateMessageId,
          message: 'message updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:messageId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:messages']),
    validationHandler({ messageId: messageIdSchema }),
    async function (req, res, next) {
      const { messageId } = req.params;

      try {
        const deleteMessageId = await messagesService.deleteMessage({ messageId });
        res.status(200).json({
          data: deleteMessageId,
          message: 'message deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = messageApi;