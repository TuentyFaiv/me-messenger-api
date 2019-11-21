const MongoLib = require('../lib/mongo');

class ChatsService {
  constructor() {
    this.collection = 'chats';
    this.mongoDB = new MongoLib();
  }

  async getChats({ userId }) {
    const query = userId && { members: { $eq: userId.toString() } };
    const chats = await this.mongoDB.getAll(this.collection, query);
    return chats || [];
  }

  async getChat({ chatId }) {
    const chat = await this.mongoDB.get(this.collection, chatId);
    return chat || {};
  }

  async createChat({ chat }) {
    const createChatId = await this.mongoDB.create(this.collection, chat);
    return createChatId;
  }

  async updateChat({ chatId, chat } = {}) {
    const updateChatId = await this.mongoDB.update(
      this.collection,
      chatId,
      chat
    );
    return updateChatId;
  }

  async deleteChat({ chatId }) {
    const deleteChatId = await this.mongoDB.delete(this.collection, chatId);
    return deleteChatId;
  }
}

module.exports = ChatsService;