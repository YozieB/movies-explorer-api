const { celebrate, Joi } = require('celebrate');
const { LINK_REG_EXP_PATTERN } = require('../constants');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_REG_EXP_PATTERN),
    trailerLink: Joi.string().required().pattern(LINK_REG_EXP_PATTERN),
    thumbnail: Joi.string().required().pattern(LINK_REG_EXP_PATTERN),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = { validateMovie, validateMovieId };
