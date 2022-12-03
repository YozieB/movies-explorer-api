const userRoutes = require('express').Router();
const { getMe, updateUser } = require('../controllers/user');
const { validationUserEdit } = require('../utils/validations/userValidation');

userRoutes.get('/users/me', getMe);
userRoutes.patch('/users/me', validationUserEdit, updateUser);

module.exports = userRoutes;
