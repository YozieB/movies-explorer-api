const { DEFAULT_ERROR } = require('../utils/constants');

module.exports = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).json({
    message:
      statusCode === 500 ? DEFAULT_ERROR : message,
  });
  next();
};
