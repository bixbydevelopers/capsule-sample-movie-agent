var movieGenreMap = require('./movieGenreMap.js')

/**
 * An array of quiz questions.
 * The questions are of multiple choice format, where the user must select a single option.
 * There is no right or wrong answer. Each option defines an array of outcomes that are tallied to calculate a final quiz result. 
 * 
 * Example:
 * {
 *   question: "What animal would you want to be for one day?"          // The question statement
 *   options: [                                                         // An array of multiple choice options
 *     {                                                                // An option
 *       text: "Bottlenose Dolphin",                                    // The option statement
 *       match: [                                                       // An array of regex match patterns to look for in the user's response. If a match is found, this option will be selected.
 *         "bottle[-\s]?nose", "dolphin"                                // For example: "bottle nose", "bottle-nose", "I wanna be a dolphin"
 *       ],
 *       outcome: [                                                     // An array of outcomes if this option is chosen
 *         movieGenreMap.Documentary.bxb,                               // A movie genre in bxb format from the movieGenreMap.js file
 *         movieGenreMap.Music.bxb,
 *         movieGenreMap.ScienceFiction.bxb
 *       ],
 *       commentary: "Smart choice."                                      // Bixby response feedback if the user chooses this option
 *     },
 *     {
 *       text: "Black Cat",
 *       match: [
 *         "cat"
 *       ],
 *       outcome: [
 *         movieGenreMap.Horror.bxb, 
 *         movieGenreMap.Mystery.bxb,
 *         movieGenreMap.Romance.bxb
 *       ],
 *       commentary: "Yay nap time!"
 *     },
 *     {
 *       text: "Bald Eagle",
 *       match: [
 *         "bald", "eagle"
 *       ],
 *       outcome: [
 *         movieGenreMap.Drama.bxb,
 *         movieGenreMap.Thriller.bxb,
 *         movieGenreMap.War.bxb
 *       ],
 *       commentary: "Very majestic."
 *     },
 *     { 
 *       text: "Golden Retriever",
 *       match: [
 *         "goldem, "retriever", "dog"
 *       ],
 *       outcome: [
 *         movieGenreMap.Animation.bxb,
 *         movieGenreMap.Comedy.bxb,
 *         movieGenreMap.Family.bxb
 *       ],
 *       commentary: "Good choice."
 *      }
 *   ]
 * }
 * 
 **/
 
module.exports = [
  {
    question: "What type of traveler are you?",
    options: [
      {
        text: "Sleeping in the woods, Wi-Fi optional",
        match: ["sleeping", "woods", "wi[-\s]fi"],
        outcome: [movieGenreMap.Action.bxb, movieGenreMap.Adventure.bxb, movieGenreMap.Horror.bxb, movieGenreMap.Thriller.bxb],
        commentary: "Sounds fun!"
      },
      {
        text: "All-inclusive cruise to an island resort",
        match: ["all[-\s]inclusive", "cruise", "island", "resort"],
        outcome: [movieGenreMap.Comedy.bxb, movieGenreMap.Family.bxb, movieGenreMap.Romance.bxb],
        commentary: "Sounds relaxing!"
      },
    ],
  },
  {
    question: "We can get you first class seats! The cabin crew would like to know how you prefer your steak.",
    options: [
      {
        text: "Well-done",
        match: ["well[-\s]done"],
        outcome: [movieGenreMap.History.bxb, movieGenreMap.Western.bxb],
        commentary: "Alright."
      },
      {
        text: "Medium",
        match: ["medium"],
        outcome: [movieGenreMap.Mystery.bxb, movieGenreMap.Drama.bxb],
        commentary: "Got it."
      },
      {
        text: "Rare",
        match: ["rare"],
        outcome: [movieGenreMap.Crime.bxb, movieGenreMap.Horror.bxb, movieGenreMap.War.bxb],
        commentary: "Bloody."
      },
      { text: "No meat please",
        match: ["no meat", "vegetarian", "vegan"],
        outcome: [movieGenreMap.Documentary.bxb],
        commentary: "No problem! We have plenty of Impossible Burgers."}
    ],
  },
  {
    question: "Your friend wants to go bungee jumping on the trip. What do you say?",
    options: [
      {
        text: "Yes! When?",
        match: ["yes", "yeah", "sure", "of course", "when"],
        outcome: [movieGenreMap.Action.bxb, movieGenreMap.Adventure.bxb, movieGenreMap.Thriller.bxb, movieGenreMap.War.bxb, movieGenreMap.Western.bxb, movieGenreMap.ScienceFiction.bxb],
        commentary: "Cowabunga it is."
      },
      {
        text: "Maybe...",
        match: ["maybe", "perhaps", "not sure"],
        outcome: [movieGenreMap.Comedy.bxb, movieGenreMap.Crime.bxb, movieGenreMap.Mystery.bxb, movieGenreMap.Romance.bxb],
        commentary: "Understood."
      },
      {
        text: "No way.",
        match: ["no", "nope", "nah"],
        outcome: [movieGenreMap.Family.bxb],
        commentary: "No problem."
      },
    ],
  },
  {
    question: "Where would you prefer to sit on your movie adventure?",
    options: [
      {
        text: "Window seat",
        match: ["window"],
        outcome: [movieGenreMap.Adventure.bxb, movieGenreMap.Action.bxb],
        commentary: "I'll get you a movie with exhilarating views."
      },
      {
        text: "Aisle seat",
        match: ["aisle"],
        outcome: [movieGenreMap.Animation.bxb, movieGenreMap.Comedy.bxb],
        commentary: "Sure, I'll get you something comfortable."
      },
    ],
  },
    {
    question: "What snack would you like for the trip?",
    options: [
      {
        text: "Popcorn",
        match: ["popcorn"],
        outcome: [movieGenreMap.Thriller.bxb, movieGenreMap.Action.bxb],
        commentary: "Classic."
      },
      {
        text: "Chocolate",
        match: ["chocolate"],
        outcome: [movieGenreMap.Fantasy.bxb, movieGenreMap.Romance.bxb],
        commentary: "Smooth."
      },
      {
        text: "Fresh fruits & veggies",
        match: ["fruit", "veggie", "vegetable"],
        outcome: [movieGenreMap.Documentary.bxb, movieGenreMap.History.bxb],
        commentary: "Healthy."
      },
      {
        text: "Leftover pizza",
        match: ["pizza"],
        outcome: [movieGenreMap.Animation.bxb, movieGenreMap.Comedy.bxb],
        commentary: "Great."
      },
    ],
  },
  {
    question: "Will your kids be joining you on this trip?",
    options: [
      {
        text: "Yes",
        match: ["yes", "yeah", "yep", "yup", "sure", "of course", "maybe", "probably", "definitely"],
        outcome: [movieGenreMap.Animation.bxb, movieGenreMap.Family.bxb],
        commentary: "Got it."
      },
      {
        text: "No kids!",
        match: ["no", "nope", "no kids", "don't have kids", "no children", "don't have children"],
        outcome: [movieGenreMap.Crime.bxb, movieGenreMap.Horror.bxb, movieGenreMap.Romance.bxb, movieGenreMap.War.bxb],
        commentary: "Okay."
      },
    ],
  },
  {
    question: "Which historical figure would you prefer as a weekend travel companion?",
    options: [
      {
        text: "Teddy Roosevelt, a former US president",
        match: ["teddy", "theodore", "roosevelt", "president"],
        outcome: [movieGenreMap.Adventure.bxb, movieGenreMap.Western.bxb],
        commentary: "Sounds like an adventure!"
      },
      {
        text: "Kurt Vonnegut, an American novelist",
        match: ["kurt", "vonnegut", "novelist"],
        outcome: [movieGenreMap.ScienceFiction.bxb, movieGenreMap.War.bxb],
        commentary: "So it goes."
      },
      {
        text: "Janis Joplin, an American blues singer",
        match: ["janis", "joplin", "singer"],
        outcome: [movieGenreMap.Drama.bxb, movieGenreMap.Music.bxb],
        commentary: "Sounds like a party!"
      },
      {
        text: "Frida Kahlo, a Mexican painter",
        match: ["frida", "kahlo", "painter"],
        outcome: [movieGenreMap.Animation.bxb, movieGenreMap.Fantasy.bxb],
        commentary: "Bien!"
      },
    ],
  },
  {
    question: "There's a chance of rain in the forecast. How do you like to spend time indoors?",
    options: [
      {
        text: "Solving puzzles and reading",
        match: ["puzzles", "reading"],
        outcome: [movieGenreMap.Crime.bxb, movieGenreMap.Documentary.bxb, movieGenreMap.Mystery.bxb],
        commentary: "That sounds fun."
      },
      {
        text: "Playing video games",
        match: ["games"],
        outcome: [movieGenreMap.Music.bxb, movieGenreMap.ScienceFiction.bxb],
        commentary: "Great!"
      },
      {
        text: "Hitting the gym",
        match: ["gym"],
        outcome: [movieGenreMap.Thriller.bxb],
        commentary: "Got it!"
      },
    ],
  },
  {
    question: "What type of book are you bringing with you for the trip?",
    options: [
      {
        text: "A high fantasy used paperback",
        match: ["fantasy", "used", "paperback"],
        outcome: [movieGenreMap.Drama.bxb, movieGenreMap.Fantasy.bxb, movieGenreMap.Music.bxb, movieGenreMap.Romance.bxb],
        commentary: "Fantastic!"
      },
      {
        text: "A new self-improvement bestseller",
        match: ["self[-\s]improvement", "self[-\s]help", "bestseller", "best seller"],
        outcome: [movieGenreMap.Documentary.bxb, movieGenreMap.Music.bxb, movieGenreMap.Family.bxb],
        commentary: "You can do it!"
      },
      {
        text: "A couple scientific papers on an e-reader",
        match: ["scientific", "papers", "e[-\s]reader"],
        outcome: [movieGenreMap.Documentary.bxb, movieGenreMap.History.bxb, movieGenreMap.ScienceFiction.bxb],
        commentary: "Indeed."
      },
      {
        text: "Manga",
        match: ["manga", "comics"],
        outcome: [movieGenreMap.Animation.bxb, movieGenreMap.Comedy.bxb, movieGenreMap.Fantasy.bxb],
        commentary: "Cool!"
      },
    ],
  },
  {
    question: "Are you a night owl or an early bird?",
    options: [
      {
        text: "Night owl. I'll sleep when I'm dead.",
        match: ["night", "owl", "dead"],
        outcome: [movieGenreMap.Crime.bxb, movieGenreMap.Horror.bxb, movieGenreMap.Mystery.bxb, movieGenreMap.Thriller.bxb],
        commentary: "Okay, I'll find something for a late night."
      },
      {
        text: "Neither. I'm a sloth.",
        match: ["neither", "sloth"],
        outcome: [movieGenreMap.Drama.bxb, movieGenreMap.War.bxb, movieGenreMap.Fantasy.bxb, movieGenreMap.ScienceFiction.bxb],
        commentary: "Okay, I'll find something that will keep you awake."
      },
      {
        text: "Early bird. Give me coffee and I'm ready for anything.",
        match: ["early", "bird", "coffee", "ready", "anything"],
        outcome: [movieGenreMap.Action.bxb, movieGenreMap.Adventure.bxb, movieGenreMap.History.bxb, movieGenreMap.Western.bxb],
        commentary: "Okay, I'll find something interesting."
      },
    ],
  },

]