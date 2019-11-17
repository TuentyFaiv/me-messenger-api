const sinon = require('sinon');

const { chatsMock, filteredChatsMock } = require('./chats');

const getAllStub = sinon.stub();
getAllStub.withArgs('chats').resolves(chatsMock);

const tagQuery = { tags: { $in: ['Graphic Designer'] } };
getAllStub.withArgs('chats', tagQuery).resolves(filteredChatsMock('Graphic Designer'));

const createStub = sinon.stub().resolves(chatsMock[0].id);

class MongoLibMock {
  getAl(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};