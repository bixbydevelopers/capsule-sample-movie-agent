var tmdb = require('./lib/TMDB.js')
var parser = require('./lib/parser.js')

module.exports.function = function findPerson(name) {
  const response = tmdb.searchPerson(name)
  const people = parser.parsePeople(response)
  return people
}
