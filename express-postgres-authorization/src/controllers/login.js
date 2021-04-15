import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

const generateJWTAccessToken = (user) => {
  // return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '15m' });
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '1m' });
  // return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5sec' }); // testing purposes
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '7d' });
  // return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '5sec' }); // testing purposes
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

export const createUser = async (req, res) => {
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
    const user_id = { user_id: data.rows[0].user_id };
    const jwtAccessToken = generateJWTAccessToken(user_id);
    const jwtRefreshToken = generateJWTRefreshToken(user_id);
    const jwtAccessTokenExpire = expiresAt(jwtAccessToken, true);
    await storeRefreshToken(user_id, jwtRefreshToken);
    res.status(200).json({
      accessToken: jwtAccessToken,
      accessTokenExpiresAt: jwtAccessTokenExpire.exp,
      first_name: data.rows[0].first_name,
    });
  } catch (err) {
    res.status(406).json({ users: err.stack, message: 'DataBase Error' });
  }
};

export const login = async (req, res) => {
  const user_id = { user_id: req.body.user_id };
  const jwtAccessToken = generateJWTAccessToken(user_id);
  const jwtRefreshToken = generateJWTRefreshToken(user_id);
  const jwtAccessTokenExpire = expiresAt(jwtAccessToken, true);
  await storeRefreshToken(user_id, jwtRefreshToken); // only storing long term refresh token in db
  // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
  return res.status(200).json({
    accessToken: jwtAccessToken,
    accessTokenExpiresAt: jwtAccessTokenExpire.exp,
    first_name: req.body.first_name,
  });
};

// export const refreshJWTAuthToken = async (req, res) => {
//   const user_id = { user_id: req.body.user_id };
//   const jwtAccessToken = generateJWTAccessToken(user_id);
//   const jwtRefreshToken = generateJWTRefreshToken(user_id);
//   await storeRefreshToken(user_id, jwtRefreshToken);
//   // res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
//   res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'strict' });
//   return res.status(200).json({ accessToken: jwtAccessToken });
// };

export const logoutUser = async (req, res) => {
  const user_id = { user_id: req.body.user_id };
  await storeRefreshToken(user_id, '');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
