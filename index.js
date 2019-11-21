const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const chatsApi = require('./routes/chats');
const contactsApi = require('./routes/contacts');
const contactsUserApi = require('./routes/contactsUser');
const messagesApi = require('./routes/messages');
const messagesChatApi = require('./routes/messagesChats');
const userChatsApi = require('./routes/userChats');

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body parser
app.use(express.json());
app.use(helmet());

//routes
authApi(app);
contactsApi(app);
contactsUserApi(app);
chatsApi(app);
userChatsApi(app);
messagesApi(app);
messagesChatApi(app);

//Catch 404
app.use(notFoundHandler);

//Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});