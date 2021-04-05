import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret } from './../settings.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtAccessTokenSecret, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError')
        return res.status(403).json({ error: true, message: 'Token Expired' });
      return res.sendStatus(403).json({ error: true, message: 'Invalid Token Authorization' });
    }
    req.user = user;
    next();
  });
};
