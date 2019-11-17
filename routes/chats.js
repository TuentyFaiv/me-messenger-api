const express = require('express');
const passport = require('passport');
const ChatsService = require('../services/chats');

const {
  chatIdSchema,
  createChatSchema,
  updateChatSchema
} = require('../utils/schemas/chats');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function chatsApi(app) {
  const router = express.Router();
  app.use("/api/chats", router);

  const chatsService = new ChatsService();

  router.get(
    "/",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:chats']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const chats = await chatsService.getChats({ tags });

        res.status(200).json({
          data: chats,
          message: 'chats listed'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:chatId",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:chats']),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { chatId } = req.params;

      try {
        const chat = await chatsService.getChat({ chatId });

        res.status(200).json({
          data: chat,
          message: 'chat retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:chats']),
    validationHandler(createChatSchema),
    async function (req, res, next) {
      const { body: chat } = req;

      try {
        const createChatId = await chatsService.createChat({ chat });

        res.status(201).json({
          data: createChatId,
          message: 'chat created'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:chatId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:chats']),
    validationHandler({ chatId: chatIdSchema }, 'params'),
    validationHandler(updateChatSchema),
    async function (req, res, next) {
      const { chatId } = req.params;
      const { body: chat } = req;

      try {
        const updatedChatId = await chatsService.updateChat({
          chatId,
          chat
        });
        res.status(200).json({
          data: updatedChatId,
          message: 'chat updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:chatId",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:chats']),
    validationHandler({ chatId: chatIdSchema }),
    async function (req, res, next) {
      const { chatId } = req.params;

      try {
        const deletedChat = await chatsService.deleteChat({ chatId });

        res.status(200).json({
          data: deletedChat,
          message: 'chat deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = chatsApi;