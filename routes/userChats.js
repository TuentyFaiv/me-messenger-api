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
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function userChatsApi(app) {
  const router = express.Router();
  app.use("/api/chats/user", router);

  const chatsService = new ChatsService();

  router.get(
    "/:userId",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-chats']),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { userId } = req.params;

      try {
        const chatsOfUser = await chatsService.getChats({ userId });

        res.status(200).json({
          data: chatsOfUser,
          message: 'chat of user retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-chats']),
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
    '/:userChatId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:user-chats']),
    validationHandler({ userChatId: chatIdSchema }, 'params'),
    validationHandler(updateChatSchema),
    async function (req, res, next) {
      const { userChatId } = req.params;
      const { body: chat } = req;

      try {
        const updatedChatId = await chatsService.updateChat({
          chatId: userChatId,
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
    '/:userChatId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-chats']),
    validationHandler({ userChatId: chatIdSchema }, 'params'),
    validationHandler(updateChatSchema),
    async function (req, res, next) {
      const { userChatId } = req.params;
      const { body: chat } = req;

      try {
        const updatedChatId = await chatsService.updateChat({
          chatId: userChatId,
          chat
        });
        res.status(200).json({
          data: updatedChatId,
          message: 'chat of user deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userChatsApi;