import express from 'express';
import {
  indexPage,
  messagesPage,
  addMessage,
  usersPage,
  findUserByEmail,
  loginUser,
  addUser,
  editUser,
  eventsPage,
  findEventsByIdAndDate,
  addEventByUserId,
} from '../controllers/index.js';
import { authenticateToken } from '../middleware/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', authenticateToken, messagesPage);
indexRouter.post('/messages', addMessage);

indexRouter.get('/users', authenticateToken, usersPage);
indexRouter.get('/users/findBy/:email', findUserByEmail);
indexRouter.post('/users/login', loginUser);
// usage of jwt makes more sense as a POST rather than a GET as you are creating a token
indexRouter.post('/users/create', addUser);
indexRouter.put('/users/edit/:id', editUser);

indexRouter.get('/events', authenticateToken, eventsPage);
indexRouter.get('/events/findBy/:id/:date/:timezone', findEventsByIdAndDate);
indexRouter.post('/event/create/:id', addEventByUserId);

export default indexRouter;
