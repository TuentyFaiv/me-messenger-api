const express = require('express');
const { chatsMock } = require('../utils/mocks/chats');

function chatsApi(app) {
  const router = express.Router();
  app.use("/api/chats", router);

  router.get("/", async function (req, res, next) {
    try {
      const chats = await Promise.resolve(chatsMock);

      res.status(200).json({
        data: chats,
        message: 'chats listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:chatId", async function (req, res, next) {
    try {
      const chat = await Promise.resolve(chatsMock[0]);

      res.status(200).json({
        data: chat,
        message: 'chat listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      const createChatId = await Promise.resolve(chatsMock[0].id);

      res.status(201).json({
        data: createChatId,
        message: 'chat created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:chatId", async function (req, res, next) {
    try {
      const updatedChatId = await Promise.resolve(chatsMock[0].id);

      res.status(200).json({
        data: updatedChatId,
        message: 'chat updated'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:chatId", async function (req, res, next) {
    try {
      const deletedChatId = await Promise.resolve(chatsMock[0].id);

      res.status(200).json({
        data: deletedChatId,
        message: 'chat deleted'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = chatsApi;