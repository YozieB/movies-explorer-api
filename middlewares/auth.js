const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unathorizedError');
require('dotenv').config();

module.exports = (req, res, next) => {
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new UnauthorizedError('Необходима авторизация'));
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
      expiresIn: '7d',
    });
  } catch (e) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
