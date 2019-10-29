# Movie Agent

Watching movies is a way to travel to new worlds.
This Capsule is like a travel agent to help you find your next movie adventure.

## Usage

1. Clone this repo.
1. Get started with the [Bixby Studio](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide).
1. Run a query in the [Simulator](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.simulator).
   1. Open the Simulator window.
   1. Pick a target device and locale.
   1. Compile NL.
   1. Enter your query by text or voice. See use cases below for example utterances.

## Use Cases

| Use Cases | Example Utterances |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Recommend a movie: <br> When no other inputs are specified, prompt for a genre <br> - Provide a selection of genres, with the "genre of the day" highlighted at the top <br> - Display a conversation driver "Help me choose" to launch the quiz to infer a genre | "What movie should I watch?" |
| Play a quiz: <br> - Launch a quiz to infer a genre by asking a series of personality type questions <br> - The genre will be used to recommend a movie. | "Play the movie quiz" <br> "Help me choose" when on the genre prompt |
| Recommend a movie by genre | "Recommend a fantasy movie" |
| Browse movies by release window | "Show me movies released last spring" |
| Find movies involving person (cast or crew member) <br> When multiple people share the same name, disambiguate with a selection prompt | "What movies feature Emma Watson" <br> "Find movies by James Cameron" |
| Find movies with a combination of inputs | "What movies did Xavier Dolan work on last year?" <br> "What documentaries came out last spring?" |

## Code Puzzles
For hands-on exercises that build upon this Capsule, head over to the [Code
Puzzles](./codelab/CODELAB.md).

## References

### Data Source

The Movie DB (TMDb). This product uses the TMDb API but is not endorsed or certified by TMDb.

https://www.themoviedb.org

https://www.themoviedb.org/documentation/api

https://developers.themoviedb.org/3

https://www.themoviedb.org/documentation/api/terms-of-use

### Bixby

[Bixby Developer Center](https://bixbydevelopers.com/)
