import express from 'express';
import { usersPage, addUser, editUser, findUserByEmail } from '../controllers/users.js';
import { indexPage } from '../controllers/home.js';
import { messagesPage, addMessage } from '../controllers/messages.js';
import { eventsPage, findEventsByIdAndDate, addEventByUserId } from '../controllers/event.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', addMessage);

indexRouter.get('/users', usersPage);
indexRouter.get('/users/findBy/:email', findUserByEmail);
indexRouter.post('/users/create', addUser);
indexRouter.put('/users/edit/:id', editUser);

indexRouter.get('/events', eventsPage);
indexRouter.get('/events/findBy/:id/:date/:timezone', findEventsByIdAndDate);
indexRouter.post('/event/create/:id', addEventByUserId);

export default indexRouter;
