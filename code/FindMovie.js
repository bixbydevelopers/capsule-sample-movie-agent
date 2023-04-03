import tmdb from "./lib/TMDB.js";
import parser from "./lib/parser.js";
import console from 'console';

export default function findMovie({
  releaseDateTimeExpression,
  person,
  genre,
  $vivContext,
}) {
  const response = tmdb.discoverMovie(releaseDateTimeExpression, person, genre, $vivContext);
  const movies = parser.parseMovies(response, $vivContext);
  return movies;
}
