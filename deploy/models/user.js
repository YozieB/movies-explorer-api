const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../utils/errors/unathorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Введён некорректный Email',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new UnauthorizedError('Неверная почта или пароль'));
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return Promise.reject(new UnauthorizedError('Неверная почта или пароль'));
    }
    return user;
  } catch (e) {
    console.log(e);
  }
};

module.exports = mongoose.model('user', userSchema);
