const router = require('express').Router();
const movieRoutes = require('./movie');
const userRoutes = require('./user');
const auth = require('../middlewares/auth');
const {
  validationCreateUser,
  validationLoginUser,
} = require('../utils/validations/userValidation');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../utils/errors/notFoundError');

router.post('/signin', validationLoginUser, login);
router.post('/signup', validationCreateUser, createUser);
router.use(auth);
router.use(movieRoutes);
router.use(userRoutes);
router.use('*', () => {
  throw new NotFoundError('Адреса не существует');
});

module.exports = router;
