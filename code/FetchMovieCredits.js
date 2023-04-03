import console from 'console';
import tmdb from "./lib/TMDB.js";
import parser from "./lib/parser.js";

export default function fetchMovieCredits({ movie }) {
  const response = tmdb.getMovieCredits(movie);
  const movieCredits = parser.parseCredits(response);
  console.info('MOVIE CREDITS', movieCredits);
  return movieCredits;
}
