# Blue Steel

## Prequel
None

## Audience
Intermediate (Rated PG – Prior grounding suggested)

## Starring
- Bixby Models

## Synopsis
Learn about Object Oriented Modeling with Bixby by adding cast and crew members
to the movie credits.

## Plot
The movies returned in this Capsule currently display information such as the
movie overview, budget, revenue and running time. In this puzzle, you will add
credits information to list out the cast and crew members that worked on each
movie.

1. The `FetchMovieCredits` Action is already part of this Capsule, although it
is not being used at the moment. It expects a Movie as an input. To invoke it
using an intent, there is an unused button defined in the `MOVIE_CREDITS` Layout
Macro of the `MovieCredits.layout.bxb` file. [Invoke the `MOVIE_CREDITS` Layout
Macro]
(https://bixbydevelopers.com/dev/docs/dev-guide/developers/building-views.layout-macros#invoking-layout-macros)
as a section in the `MOVIE_DETAILS` Layout Macro of the
`Movie_Details.layout.bxb` file.

  > *Tip: There’s a [keyboard
shortcut](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.cheatsheet#view)
to quickly jump to go to a file by name*

  > *Pro tip: You can use the [Command
Palette](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.basics#keyboard-shortcuts)
to quickly execute commands and find shortcuts*

  > *Pro tip: There's a [keyboard shortcut](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.cheatsheet#edit) for autocomplete to help with completing layout-macro's and defining parameters*

2. Now, when you run the capsule and go to details for any Movie, you will see a button that says "Movie credits".

  > *Tip: The [README file](../../../README.md) explains how to run this Capsule
and provides example utterances*

  If you click on the button, you will observe that the flow is incomplete at this
stage. Indeed, open the [Debug
Console](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging)
and observe the Value Compilation Error. Not to worry. This is because the
`FetchMovieCredits` Action model currently is set to output type `core.Text`, while
the `FetchMovieCredits` Javascript Action Implementation returns the movie credits
in this format:
```json
{
  "cast": [
    {
      "name": "Mena Massoud",
      "profileUrl": "http://image.tmdb.org/t/p/original/yeaEd4P4kNlRkDqzunsQeh24rQm.jpg",
      "character": "Aladdin"
    },
    {
      "name": "Naomi Scott",
      "profileUrl": "http://image.tmdb.org/t/p/original/d140yTWCle6rYUGE9GIVZVPaPng.jpg",
      "character": "Jasmine"
    },
    {
      "name": "Will Smith",
      "profileUrl": "http://image.tmdb.org/t/p/original/zCrnERhs0L8FNK6xz4f5wWp0pKK.jpg",
      "character": "Genie"
    }
  ],
  "crew": [
    {
      "department": "Directing",
      "team": [
        {
          "name": "Guy Ritchie",
          "profileUrl": "http://image.tmdb.org/t/p/original/uLpiixgcko2W5GLsqBEvSfluyEs.jpg",
          "job": "Director"
        },
        {
          "name": "Max Keene",
          "job": "First Assistant Director"
        }
      ]
    },
    {
      "department": "Writing",
      "team": [
        {
          "name": "John August",
          "profileUrl": "http://image.tmdb.org/t/p/original/t0jbO861bLCaKVC4hDBZ7sic8na.jpg",
          "job": "Screenplay"
        },
        {
          "name": "Guy Ritchie",
          "profileUrl": "http://image.tmdb.org/t/p/original/uLpiixgcko2W5GLsqBEvSfluyEs.jpg",
          "job": "Screenplay"
        }
      ]
    }
  ]
}
```

3. Your mission, should you choose to accept it, is to create [Models in
Bixby](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling) to
match the above format, and update the `FetchMovieCredits` output type to your new
Structure.

  > *Tip: `FetchMovieCredits` was implemented to log out its response, so you can
see the data for each movie in the [Debug Console Function logs
section](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging#logging)
for `FetchMovieCredits`*

  > *Tip: By default, the [Structure
Concept](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts#structure-concepts)
property cardinality is `min(Optional) max(One)`. You can change it to match the
data.*

  > *Pro tip: For [Primitives
Concepts](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts#primitive-concepts)
that will not be used by the Bixby Planner, you can use the predefined Models
from the [core
library](https://bixbydevelopers.com/dev/docs/dev-guide/developers/library.core)
as the property type (such as `core.Text`), so long as you mark them as `visibility (Private)`*

  > *Pro tip: The `Person.model.bxb` file already contains a simple Person Structure
with a name and a profileUrl that is used as part of the search flow. You can
[extend](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts#extension)
Person to add new fields while inheriting existing fields*

  When your models match the data, the Value Compilation Error will go away and
you will see the raw results on the screen. You did it!

You can continue to the [Magnum puzzle](./magnum.md) to work on your pose and
design layouts for the movie credits that will stun the runway.

## Rating
5 stars to go to the movie credits for Zoolander and walk-off your Models in the
Debug Console.
