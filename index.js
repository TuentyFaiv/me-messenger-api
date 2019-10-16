const express = require('express');
const app = express();

const { config } = require('./config/index');
const chatsApi = require('./routes/chats');

chatsApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});