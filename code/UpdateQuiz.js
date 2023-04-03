import quizLogic from "./lib/quizLogic.js";

export default function ({ quiz, answer }) {
  return quizLogic.updateQuiz(quiz, answer);
}
