import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

//functions

const generateJWTAccessToken = (user) => {
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '15m' });
  // return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5sec' });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '7d' });
  // return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '5sec' });
};

const expiresAt = (token, access) => {
  if (access) {
    return jwt.verify(token, jwtAccessTokenSecret);
  } else {
    return jwt.verify(token, jwtRefreshTokenSecret);
  }
};

const storeRefreshToken = async (user_id, jwtRefreshToken) => {
  let jwtExpiresAt;
  let update;
  if (jwtRefreshToken.length !== 0) {
    jwtExpiresAt = expiresAt(jwtRefreshToken, false);
    update = `JWT_REFRESH_TOKEN='${jwtRefreshToken}', JWT_EXPIRES_AT=${jwtExpiresAt.exp}`;
  }
  if (jwtRefreshToken === '') {
    let rightNow = new Date();
    rightNow = parseInt(rightNow.getTime().toString().slice(0, 10));
    update = `JWT_REFRESH_TOKEN='', JWT_EXPIRES_AT=${rightNow}`;
  }
  return await usersModel.updateWithReturn(
    update,
    `user_id = ${user_id.user_id}`,
    'JWT_EXPIRES_AT'
  );
  // return jwtExpiresAt.exp;
};

const getStoredRefreshToken = async (user_id, jwtRefreshToken) => {
  let columns = `JWT_REFRESH_TOKEN`;
  let clause = `WHERE user_id = '${user_id.user_id}'`;
  return await usersModel.select(columns, clause);
};

export const createUser = async (req, res) => {
  console.log(req.body);
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
  try {
    const data = await usersModel.insertWithReturn(columns, values);
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const login = async (req, res) => {
  const user_id = { user_id: req.body.user_id };
  const jwtAccessToken = generateJWTAccessToken(user_id);
  // let accessExpiresAt = expiresAt(jwtAccessToken, true);
  const jwtRefreshToken = generateJWTRefreshToken(user_id);
  await storeRefreshToken(user_id, jwtRefreshToken); // only storing long term refresh token in db
  // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
  return res.status(200).json({ accessToken: jwtAccessToken });
};

// get new access token using refresh token, silent refresh

export const refreshJWTAuthToken = async (req, res) => {
  if (!req.cookies.refreshToken)
    return res.status(403).json({ error: true, message: 'Not Logged In' });
  const refreshToken = req.cookies.refreshToken;
  let decodedUser;
  jwt.verify(refreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: `${err.message}` });
    }
    decodedUser = user;
  });
  if (!decodedUser) return;
  let storedRefreshToken = await getStoredRefreshToken(decodedUser, refreshToken);
  // check for value
  storedRefreshToken = storedRefreshToken.rows[0].jwt_refresh_token;
  if (refreshToken !== storedRefreshToken)
    return res.status(403).json({ error: true, message: 'Unauthorized Refresh Token, logout' });
  const jwtAccessToken = generateJWTAccessToken({ user_id: decodedUser.user_id });
  const jwtRefreshToken = generateJWTRefreshToken({ user_id: decodedUser.user_id });
  await storeRefreshToken(decodedUser, jwtRefreshToken);
  // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
  return res.status(200).json({ accessToken: jwtAccessToken });
};

// test authorization route

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({
      users: data.rows.filter((user) => user.user_id === req.user.rows[0].user_id),
    });
  } catch (err) {
    res.status(400).json({ users: err.stack });
  }
};

// invalidate refreshToken token

export const logoutUser = async (req, res) => {
  const user = req.user.rows[0];
  await storeRefreshToken(user, '');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
