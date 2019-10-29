var config = require('config')
var console = require('console')

module.exports = {
  initializeQuiz: initializeQuiz,
  updateQuiz: updateQuiz
}

function initializeQuiz() {
  var quiz = {
    completed: false,
    currentQuestion: 0,
    questions: buildQuestions()
  }
  return quiz
}

function updateQuiz (quiz, answer) {
  // See if answer corresponds to any of the current question options
  var matchedIndex = quiz.questions[quiz.currentQuestion].options.findIndex(function(option) {
    // Check alias
    if (stringCompare(answer, option.alias)) {
      return true
    }
    // Check match
    return option.match.find(function(pattern) {
      return regexCompare(answer, pattern)
    })
  })
  if (matchedIndex >= 0) {
    // Save the matched index
    quiz.questions[quiz.currentQuestion].selectedOption = matchedIndex
     // Advance to next question
    quiz.currentQuestion++
    if (quiz.currentQuestion < quiz.questions.length) {
      // continue
    } else {
      // Mark quiz as completed
      quiz.completed = true
      // Tally answers
      quiz.finalOutcome = computeOutcome(quiz)
    }
  } else {
    // Leave quiz unmodified and it will reprompt for the current question
  }
  return quiz
}

function stringCompare(a,b) {
  return a.toLowerCase() === b.toLowerCase()
}

function regexCompare(textToSearch, regexPatternAsString) {
  var regex = new RegExp(regexPatternAsString, 'i') // Ignore case
  return regex.test(textToSearch)
}

function computeOutcome (quiz) {
  if (!quiz || !quiz.completed) {
    throw "Incomplete quiz"
  }
  var tally = {}
  quiz.questions.forEach(function(question) {
    question.options[question.selectedOption].outcome.forEach(function(outcome) {
      tally[outcome] = tally[outcome] + 1 || 1
    })
  })
  console.info("Tally outcomes", JSON.stringify(tally))
  var topOutcome
  for (var outcome in tally) {
    if (!topOutcome || tally[outcome] > tally[topOutcome]) {
      topOutcome = outcome
    }
  }
  console.info("Top outcome", topOutcome)
  return topOutcome
}

function buildQuestions() {
  var questionsJson = require("./quizQuestions.js")
  // Randomly pick N questions
  questionsJson = getRandomSubarray(questionsJson, config.get('movieGenreQuizLength'))
  return questionsJson.map(function (question) {
    return buildQuestion(question)
  })
}

function buildQuestion(questionJson) {
  return {
    text: questionJson.question,
    options: buildOptions(questionJson.options)
  }
}

function buildOptions(optionsJson) {
  return optionsJson.map(function (option, index) {
    return buildOption(option, index)
  })
}

function buildOption(optionJson, index) {
  return {
    text: optionJson.text,
    alias: String.fromCharCode('A'.charCodeAt(0) + index),
    match: buildMatch(optionJson.match),
    outcome: buildOutcome(optionJson.outcome),
    commentary: optionJson.commentary
  }
}

function buildMatch(matchJson) {
  return matchJson
}

function buildOutcome(outcomeJson) {
  return outcomeJson
}

// http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0),
      i = arr.length,
      min = i - size,
      temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}