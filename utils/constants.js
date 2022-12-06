const INCORRECT_DATA_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const UNAUTHORIZED_ERROR_CODE = 401;
const SUCCESS_CREATED_CODE = 201;
const LINK_REG_EXP_PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const URL_ERROR = 'Некорректный URL';
const MOVIE_CREATE_INCORRECT_DATA = 'Некорректные данные для добавления фильма';
const MOVIE_NOT_FOUND = 'Фильм с таким id не найден';
const MOVIE_DELETE_FORBIDDEN = 'Нельзя удалять чужие фильмы';
const MOVIE_DELETE_INCORRECT_DATA = 'Некорректные данные для удаления фильма';
const INCORRECT_DATA_EDIT_PROFILE = 'Некорректные данные при обновлении профиля';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const DEFAULT_ERROR = 'Произошла ошибка на сервере';
const PAGE_NOT_FOUND = 'Запрашиваемая страница не найдена';
const EMAIL_EXISTS = 'Пользователь с таким email уже зарегистрирован';
const EMAIL_ERROR = 'Некорректный email';
const USER_IS_NOT_REGISTERED = 'Данный пользователь не зарегистрирован';
const INCORRECT_EMAIL_OR_PASS = 'Неправильные почта или пароль';
const REGISTER_INCORRECT_DATA = 'Переданы некорректные данные для регистрации';
const USER_NOT_FOUND = 'Пользователь с таким id не найден';
const INCORRECT_DATA = 'Переданы некорректные данные';
const SUCCESS_USER_CREATION = 'Пользователь успешно создан';
const SUCCESS_MOVIE_REMOVE = 'Фильм удален';
module.exports = {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  SUCCESS_CREATED_CODE,
  UNAUTHORIZED_ERROR_CODE,
  LINK_REG_EXP_PATTERN,
  URL_ERROR,
  INCORRECT_DATA,
  EMAIL_ERROR,
  PAGE_NOT_FOUND,
  DEFAULT_ERROR,
  AUTHORIZATION_REQUIRED,
  INCORRECT_EMAIL_OR_PASS,
  MOVIE_CREATE_INCORRECT_DATA,
  MOVIE_NOT_FOUND,
  MOVIE_DELETE_FORBIDDEN,
  MOVIE_DELETE_INCORRECT_DATA,
  USER_IS_NOT_REGISTERED,
  EMAIL_EXISTS,
  INCORRECT_DATA_EDIT_PROFILE,
  REGISTER_INCORRECT_DATA,
  USER_NOT_FOUND,
  SUCCESS_USER_CREATION,
  SUCCESS_MOVIE_REMOVE,
};
