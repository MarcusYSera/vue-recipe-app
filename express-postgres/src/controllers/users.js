import Model from '../models/model.js';

const usersModel = new Model('users');
import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({ users: data.rows.filter((user) => user.email === req.user.email) });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  const columns = 'user_id, first_name, last_name, email, password';
  const clause = `WHERE email = '${email}'`;
  try {
    const data = await usersModel.select(columns, clause);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const addUser = async (req, res) => {
  // console.log(req.body);
  let values = '';
  let columns = [];
  for (const [key, value] of Object.entries(req.body)) {
    columns.push(key);
    if (values.length === 0) {
      values = `'${value}'`;
    } else {
      values += `, '${value}'`;
    }
  }
  columns = columns.join(', ');
  // console.log(columns);
  // console.log(values);
  try {
    const data = await usersModel.insertWithReturn(columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const editUser = async (req, res) => {
  let values = '';
  let columns = [];
  for (const [key, value] of Object.entries(req.body)) {
    columns.push(key);
    if (values.length === 0) {
      values = `${key} = '${value}'`;
    } else {
      values += `,${key} = '${value}'`;
    }
  }
  columns = columns.join(', ');
  const { id } = req.params;
  const clause = `user_id = '${id}'`;
  // console.log(columns);
  // console.log(values);
  try {
    const data = await usersModel.updateWithReturn(clause, columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};
