var tmdb = require('./lib/TMDB.js')
var parser = require('./lib/parser.js')

module.exports.function = function findMovie(releaseDateTimeExpression, person, genre) {
  const response = tmdb.discoverMovie(releaseDateTimeExpression, person, genre)
  const movies = parser.parseMovies(response)
  return movies
}
