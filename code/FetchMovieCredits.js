var console = require('console')
var tmdb = require('./lib/TMDB.js')
var parser = require('./lib/parser.js')

module.exports.function = function fetchMovieCredits(movie) {
  const response = tmdb.getMovieCredits(movie)
  const movieCredits = parser.parseCredits(response)
  console.info("MOVIE CREDITS", movieCredits)
  return movieCredits
}
