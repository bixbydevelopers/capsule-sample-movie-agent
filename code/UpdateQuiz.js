import {updateQuiz} from "./lib/quizLogic.js";

export default function ({ quiz, answer }) {
  return updateQuiz(quiz, answer);
}
