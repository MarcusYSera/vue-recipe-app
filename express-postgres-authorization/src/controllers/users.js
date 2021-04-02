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

export const loginReturnAuthorizationToken = async (req, res) => {
  const user_id = { user_id: req.body.user_id };
  const jwtAccessToken = generateJWTAccessToken(user_id);
  // let accessExpiresAt = expiresAt(jwtAccessToken, true);
  const jwtRefreshToken = generateJWTRefreshToken(user_id);
  // only storing long term refresh token in db
  await storeRefreshToken(user_id, jwtRefreshToken);
  // const refreshExpiresAt = await storeRefreshToken(user_id, jwtRefreshToken);
  // const jwtExpiresAt = refreshExpiresAt.rows[0].jwt_expires_at;
  // res.cookie('accessToken', jwtAccessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  // res.cookie('expiresAtRefreshToken', jwtExpiresAt, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookie('accessToken', jwtAccessToken, { httpOnly: true, sameSite: 'strict' });
  res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
  // res.cookie('expiresAtRefreshToken', jwtExpiresAt, { httpOnly: true, sameSite: 'strict' });
  return res.sendStatus(200);
};

// get new access token using refresh token, silent refresh

export const refreshJWTAuthToken = async (req, res) => {
  const user = req.user;
  if (!user.rows.length) return res.sendStatus(401);
  const jwtRefreshToken = user.rows[0].jwt_refresh_token;
  if (!jwtRefreshToken) return res.sendStatus(403);
  jwt.verify(jwtRefreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const jwtAccessToken = generateJWTAccessToken({
      user_id: user.user_id,
    });
    // res.cookie('accessToken', jwtAccessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('accessToken', jwtAccessToken, { httpOnly: true, sameSite: 'strict' });
    return res.status(200).json({ message: 'successfully reissued token' });
  });
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
  res.clearCookie('accessToken');
  res.sendStatus(204);
};
