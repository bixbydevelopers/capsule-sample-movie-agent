const { updateQuiz } = require("./lib/quizLogic.js")

module.exports.function = function (quiz, answer) {
  return updateQuiz (quiz, answer)
}