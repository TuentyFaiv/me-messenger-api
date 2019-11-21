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
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function messageChatApi(app) {
  const router = express.Router();
  app.use('/api/messages/chat', router);

  const messagesService = new MessagesService();

  router.get(
    "/:inChat",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-messages']),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { inChat } = req.params;

      try {
        const messagesOfChat = await messagesService.getMessages({ inChat });

        res.status(200).json({
          data: messagesOfChat,
          message: 'messages of chat retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-messages']),
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
    scopesValidationHandler(['update:user-messages']),
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
    scopesValidationHandler(['delete:user-messages']),
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

module.exports = messageChatApi;