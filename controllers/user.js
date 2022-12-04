const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { NOT_FOUND_ERROR_CODE, JWT_SECRET } = require('../utils/constants');
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
      message: 'Пользователь успешно создан',
    });
  } catch (e) {
    if (e.code === 11000) {
      next(
        new ConflictError('Пользователь с данным email уже зарегистрирован'),
      );
    } else if (e.name === 'CastError') {
      next(new BadRequestError('Переданы не валидные данные'));
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
      return res.status(NOT_FOUND_ERROR_CODE).json({
        message: 'Пользователь не найден',
      });
    }

    res.send(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
    } else {
      next(e);
    }
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('Пользователь с таким id не найден');
    }
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
    });
  } catch (e) {
    next(new UnauthorizedError('Неправильные почта или пароль'));
  }
};

module.exports = {
  createUser,
  updateUser,
  getMe,
  login,
};
