import express from 'express';
import {
  indexPage,
  messagesPage,
  addMessage,
  usersPage,
  addUser,
  editUser,
  findUser,
} from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', addMessage);

indexRouter.get('/users', usersPage);
indexRouter.get('/users/findBy/:email', findUser);
indexRouter.post('/users/create', addUser);
indexRouter.post('/users/edit', editUser);

export default indexRouter;
