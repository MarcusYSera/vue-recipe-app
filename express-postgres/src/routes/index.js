import express from 'express';
import { indexPage, messagesPage, addMessage, usersPage, addUser, editUser } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', addMessage);

indexRouter.get('/users', usersPage);
indexRouter.post('/users/create', addUser);
indexRouter.post('/users/edit', editUser);

export default indexRouter;
