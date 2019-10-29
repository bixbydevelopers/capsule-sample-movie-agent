# Jedi In Training

## Prequel
None

## Audience
Beginner (Rated G - General Audiences)

## Starring
- Bixby Concept
  - Models
  - Dialogs
  - Vocab
  - Training

## Synopsis
Expand this Capsule by teaching Bixby about a new movie genre, touching
models, dialogs, vocab and NL training.

## Plot
This Capsule supports searching for several movie genres already: Fantasy,
Science Fiction, Comedy, etc. In this puzzle, you will teach it about a new
genre: Television Film. This refers to feature-length movies produced and
distributed on television, without having an initial showing in theaters.
Coincidentally, these often feature sharks: Megalodon (2018), Sharknado (2013),
Sharktopus (2010)...

1. Start by updating the Capsule modeling layer; the internal representation of
Bixby's actionable world. Open the MovieGenre.model.bxb file and and add a new
symbol for Television Film to the MovieGenre [Enum
Concept](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts#primitive-concepts).

  > *Tip: There’s a [keyboard
shortcut](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.cheatsheet#view)
to quickly jump to go to a file by name*

  > *Pro tip: You can use the [Command
Palette](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.basics#keyboard-shortcuts)
to quickly execute commands and find shortcuts*

2. Open the template-macro-defs.dialog.bxb file and add a new case in the
MOVIE_GENRE_VALUE template-macro-def to define the
[dialog](https://bixbydevelopers.com/dev/docs/dev-guide/developers/refining-dialog)
for this new symbol. [Tune the dialog
text-to-speech](https://bixbydevelopers.com/dev/docs/dev-guide/developers/refining-dialog.intro-dialog#tuning-dialog-text-to-speech)
such that the written text is “TV” while the spoken text is “television”.

3. Update the [Javascript Action
Implementation](https://bixbydevelopers.com/dev/docs/dev-guide/developers/actions.js-actions)
that calls The Movie DB APIs to be able to fetch data for this genre. To do so,
open the movieGenreMap.js file and add a mapping from the Bixby symbol to The
Movie DB ID. The tmdbId for the Television Film genre is `10770`.

4. Open the MovieGenre.vocab.bxb file and add an entry with synonyms for Television
Film. This [vocabulary for
enumerations](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.vocabulary#vocabulary-for-enumerations)
will bootstrap the NL understanding for this symbol.

5. Already, you can try running NL queries such as “Find a television movie”. This
should work without additional training since the pattern “Find a <genre>
movie.” is already trained and you just added vocabulary for the genre. However,
formulations that are unique to this new genre may not work without some
training. Think about how you would inquire for movies that fall in the
Television Film genre. For example, “Show me a movie that was distributed on
television”. Open the training UI and [add NL
training](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training)
for these unique formulations.

  > *Tip: You can find similar training for the other genres with the search query
`goal:Movie value:MovieGenre`. Use these annotation patterns as inspiration,
changing the MovieGenre to Television Film.*

6. Compile the NL Model and iteratively  add more training examples until
everything is [well
learned](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training#learned-vs-not-learned-training).

## Rating
5 stars for asking Bixby “What movies premiered on television last year” and
receiving movies that belong to that genre and year with a supporting dialog.
