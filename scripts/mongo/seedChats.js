// DEBUG=app:* node scripts/mongo/seedChats.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:chats');
const MongoLib = require('../../lib/mongo');
const { chatsMock } = require('../../utils/mocks/chats');

async function seedChats() {
  try {
    const mongoDB = new MongoLib();

    const promises = chatsMock.map(async chat => {
      await mongoDB.create('chats', chat);
    });

    await Promise.all(promises);
    debug(
      chalk.green(`${promises.length} chats have been created succesfull`)
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedChats();