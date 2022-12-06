const movieModel = require('../models/movie');
const {
  SUCCESS_CREATED_CODE,
  INCORRECT_DATA,
  SUCCESS_MOVIE_REMOVE,
  MOVIE_NOT_FOUND,
  MOVIE_DELETE_FORBIDDEN,
} = require('../utils/constants');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.find({ owner: req.user._id });
    res.json(movies);
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(SUCCESS_CREATED_CODE).json({ movie });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(INCORRECT_DATA));
    } else {
      next(e);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieToRemove = await movieModel.findById(req.params._id);
    if (!movieToRemove) {
      next(new NotFoundError(MOVIE_NOT_FOUND));
    }
    if (movieToRemove.owner.toString() !== req.user._id) {
      next(new ForbiddenError(MOVIE_DELETE_FORBIDDEN));
    }
    const removableMovie = await movieToRemove.remove();
    res.json({
      message: SUCCESS_MOVIE_REMOVE,
    });
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError(INCORRECT_DATA));
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
