const movieModel = require('../models/movie');
const { SUCCESS_CREATED_CODE } = require('../utils/constants');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.find();
    res.json(movies);
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await movieModel.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    res.status(SUCCESS_CREATED_CODE).json({ movie });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Переданые некорректные данные'));
    } else {
      next(e);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieToRemove = await movieModel.findById(req.params._id);
    if (!movieToRemove) {
      throw new NotFoundError('Фильм с таким id не найден');
    }
    if (movieToRemove.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалять чужие фильмы');
    }
    const removableMovie = await movieToRemove.remove();
    res.json({
      message: 'Фильм удален',
    });
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(e);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
