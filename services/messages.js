const MongoLib = require('../lib/mongo');

class MessagesService {
  constructor() {
    this.collection = 'messages';
    this.mongoDB = new MongoLib();
  }

  async getMessages({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const messages = await this.mongoDB.getAll(this.collection, query);
    return messages || [];
  }

  async getMessage({ messageId }) {
    const message = await this.mongoDB.get(this.collection, messageId);
    return message || {};
  }

  async createMessage({ message }) {
    const createMessageId = await this.mongoDB.create(this.collection, message);
    return createMessageId;
  }

  async updateMessage({ messageId, message } = {}) {
    const updateMessageId = await this.mongoDB.update(
      this.collection,
      messageId,
      message
    );
    return updateMessageId;
  }

  async deleteMessage({ messageId }) {
    const deleteMessageId = await this.mongoDB.delete(this.collection, messageId);
    return deleteMessageId;
  }
}

module.exports = MessagesService;