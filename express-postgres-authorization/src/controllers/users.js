import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

//functions

const generateJWTAccessToken = (user) => {
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5m' });
  // return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5sec' });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '7d' });
};

const expiresAt = (token, access) => {
  if (access) {
    return jwt.verify(token, jwtAccessTokenSecret);
  } else {
    return jwt.verify(token, jwtRefreshTokenSecret);
  }
};

const storeRefreshToken = async (user_id, jwtRefreshToken) => {
  let jwtExpiresAt = expiresAt(jwtRefreshToken, false);
  return await usersModel.updateWithReturn(
    `JWT_REFRESH_TOKEN='${jwtRefreshToken}', JWT_EXPIRES_AT=${jwtExpiresAt.exp}`,
    `user_id = ${user_id.user_id}`,
    'JWT_EXPIRES_AT'
  );
  // return jwtExpiresAt.exp;
};

export const login = async (req, res) => {
  const user_id = { user_id: req.body.user_id };
  const jwtAccessToken = generateJWTAccessToken(user_id);
  // let accessExpiresAt = expiresAt(jwtAccessToken, true);
  const jwtRefreshToken = generateJWTRefreshToken(user_id);
  // only storing long term refresh token in db
  await storeRefreshToken(user_id, jwtRefreshToken);
  // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
  return res.status(200).json({ accessToken: jwtAccessToken });
};

// get new access token using refresh token, silent refresh

export const refreshJWTAuthToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(403);
  jwt.verify(refreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(`user decoded from jwt: ${JSON.stringify(user)}`);
  });
  console.log('refresh log');
  // const jwtAccessToken = generateJWTAccessToken({
  //   user_id: user.user_id,
  // });
  // const jwtRefreshToken = generateJWTRefreshToken({ user_id: user.user_id });
  // await storeRefreshToken(user_id, jwtRefreshToken);
  // // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
  // return res.status(200).json({ accessToken: jwtAccessToken, refreshToken: jwtRefreshToken });
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

// invalidate access token

export const logoutUser = async (req, res) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
