import * as tmdb from "./lib/TMDB.js";
import * as parser from "./lib/parser.js";

export default function findPerson({ name }) {
  const response = tmdb.searchPerson(name);
  const people = parser.parsePeople(response);
  return people;
}
