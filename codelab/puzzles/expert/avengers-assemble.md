# Avengers Assemble

## Prequel
None

## Audience
Expert (Rated PG-13 – Prior grounding required)

## Starring
- Bixby Actions
 - Models
 - Implementation

## Synopsis
Expand a Capsule by adding a new Action to get trending movies, constructing the
Action Model and connecting it to data with a Javascript Action Implementation.

## Plot
The Movie DB, which is the source of the data for this capsule, allows to get
trending movies for a time window (current day or week). In this puzzle, you
will teach Bixby this ability.

1. [Create a new
file](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.basics#creating-files) using
the structure template to hold a [Structure
Concept](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts#structure-concepts)
for trending movies. Call it `TrendingMovie` and make it a [role
assignment](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts#role-assignment)
of the already existing Movie Structure.

2. Create another new file, this time using the Action template. [Model the
Action](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-actions)
according to the following specifications. The Action will optionally accept an
input of type `time.DateTimeExpression` that will constrain the search to a
specific time window. It will perform a Search operation that will output
results. These results will conform to the `TrendingMovie` Structure that you
created earlier. Don't forget to give your Action a representative name.

  > *Tip: Use the convenient `time.DateTimeExpression` Structure from the [time
library](https://bixbydevelopers.com/dev/docs/dev-guide/developers/library.datetime)
to take care of abstracting out complex time requests*

3. Create a new [Javascript Action
Implementation](https://bixbydevelopers.com/dev/docs/dev-guide/developers/actions.js-actions)
to get the trending movies from The Movie DB APIs.
  > *Tip: You can import and use the ready-made Javascript functions from this
Capsule's `code/lib` folder to make the API call and parse the response*
    ```js
    var tmdb = require('./lib/TMDB.js')
    var parser = require('./lib/parser.js')
    module.exports.function = function findTrendingMovies (trendingWindow) {
      const response = tmdb.getTrendingMovies(trendingWindow)
      const movies = parser.parseMovies(response)
      return movies
    }
    ```

4. Connect your Action Model to your local Action Implementation in the
[endpoints.bxb
file](https://bixbydevelopers.com/dev/docs/dev-guide/developers/actions.configuring-endpoints#local-endpoints).
Make sure the Action Model and Input names match the Action Javascript
Implementation file and input names.

5. Think about how you would inquire for trending movies for the current day or
week. For example, “What are the top trending movies today?”. Open the training
UI and [add NL
training](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training)
for this ability. Annotate your training such that the goal is the `TrendingMovie`
Concept you created earlier. Set the trending window value (example: "today") to
be the convenient `time.DateTimeExpression` Structure type.

6. Finally, use the [Device
Simulator](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.simulator)
to test your Action.

  > *Tip: Look at the [Debug
Console](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging)
to verify Bixby's understanding and execution*

  > *Pro tip: You can update the
[Dialog](https://bixbydevelopers.com/dev/docs/dev-guide/developers/refining-dialog.intro-dialog)
to echo out the time window to the user, explicitly confirming that the request
was well understood.*

## Rating
5 stars for a capsule that handles “What movies are trending this week” and
“Show me today’s trending movies”. Can you demonstrate that Bixby understood and
respected the trending window?
