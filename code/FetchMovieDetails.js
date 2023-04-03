import tmdb from "./lib/TMDB.js";
import parser from "./lib/parser.js";

export default function fetchMovieDetails({ movie }) {
  const response = tmdb.getMovie(movie);
  const movieDetails = parser.parseMovieDetails(response);
  return movieDetails;
}
