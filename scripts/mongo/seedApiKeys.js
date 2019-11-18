const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:script:api-keys');
const MongoLib = require('../../lib/mongo');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:messages',
  'create:messages',
  'update:messages',
  'delete:messages',
  'read:user-messages',
  'create:user-messages',
  'update:user-messages',
  'delete:user-messages',
  'read:contacts',
  'create:contacts',
  'update:contacts',
  'delete:contacts',
  'read:user-contacts',
  'create:user-contacts',
  'update:user-contacts',
  'delete:user-contacts',
  'read:chats',
  'create:chats',
  'update:chats',
  'delete:chats',
  'read:user-chats',
  'create:user-chats',
  'update:user-chats',
  'delete:user-chats'
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:user-messages',
  'create:user-messages',
  'update:user-messages',
  'delete:user-messages',
  'read:user-contacts',
  'create:user-contacts',
  'update:user-contacts',
  'delete:user-contacts',
  'read:user-chats',
  'create:user-chats',
  'update:user-chats',
  'delete:user-chats'
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    debug(
      chalk.green(`${promises.length} apiKeys has been created succesfuly`)
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    return process.exit(1);
  }
}

seedApiKeys();