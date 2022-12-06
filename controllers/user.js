const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE,
  EMAIL_EXISTS,
  REGISTER_INCORRECT_DATA,
  USER_NOT_FOUND,
  SUCCESS_USER_CREATION, INCORRECT_DATA, INCORRECT_EMAIL_OR_PASS,
} = require('../utils/constants');
const BadRequestError = require('../utils/errors/badRequestError');
const ConflictError = require('../utils/errors/conflictError');
const NotFoundError = require('../utils/errors/notFoundError');
const UnauthorizedError = require('../utils/errors/unathorizedError');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hash,
    });
    res.json({
      message: SUCCESS_USER_CREATION,
      user,
    });
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError(EMAIL_EXISTS));
    } else if (e.name === 'CastError') {
      next(new BadRequestError(REGISTER_INCORRECT_DATA));
    } else {
      next(e);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      res.status(NOT_FOUND_ERROR_CODE).json({
        message: USER_NOT_FOUND,
      });
    }
    res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
    } else {
      console.log(e);
      next(e);
    }
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      next(new NotFoundError(USER_NOT_FOUND));
    }
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError(INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { NODE_ENV, JWT_SECRET } = process.env;
    const user = await userModel.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
      { expiresIn: '7d' },
    );
    res.json({
      token,
    });
  } catch (e) {
    next(new UnauthorizedError(INCORRECT_EMAIL_OR_PASS));
  }
};

module.exports = {
  createUser,
  updateUser,
  getMe,
  login,
};
