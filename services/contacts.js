const MongoLib = require('../lib/mongo');

class ContactsService {
  constructor() {
    this.collection = 'contacts';
    this.mongoDB = new MongoLib();
  }

  async getContacts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const contacts = await this.mongoDB.getAll(this.collection, query);
    return contacts || [];
  }

  async getContact({ contactId }) {
    const contact = await this.mongoDB.get(this.collection, contactId);
    return contact;
  }

  async createContact({ contact }) {
    const createContactId = await this.mongoDB.create(this.collection, contact);
    return createContactId;
  }

  async updateContact({ contactId, contact } = {}) {
    const updateContactId = await this.mongoDB.update(
      this.collection,
      contactId,
      contact
    );
    return updateContactId;
  }

  async deleteContact({ contactId }) {
    const deleteContactId = await this.mongoDB.delete(this.collection, contactId);
    return deleteContactId;
  }
}

module.exports = ContactsService;