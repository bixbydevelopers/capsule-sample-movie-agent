var tmdb = require('./lib/TMDB.js')
var parser = require('./lib/parser.js')

module.exports.function = function fetchMovieDetails(movie) {
  const response = tmdb.getMovie(movie)
  const movieDetails = parser.parseMovieDetails(response)
  return movieDetails
}
