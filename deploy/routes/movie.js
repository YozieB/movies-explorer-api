const movieRoutes = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const {
  validateMovie,
  validateMovieId,
} = require('../utils/validations/movieValidation');

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', validateMovie, createMovie);
movieRoutes.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = movieRoutes;
