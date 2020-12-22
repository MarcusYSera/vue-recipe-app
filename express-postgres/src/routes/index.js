import express from 'express';
import { indexPage, messagesPage, addMessage, usersPage, addUser } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', addMessage);

indexRouter.get('/users', usersPage);
indexRouter.post('/users', addUser);

export default indexRouter;
