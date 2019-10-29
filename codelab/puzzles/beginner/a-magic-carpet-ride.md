# A Magic Carpet Ride

## Prequel
[Yer A Wizard](../newcomer/yer-a-wizard.md)

## Audience
Beginner (Rated G - General Audiences)

## Starring
- Bixby Templates
- NL Training

## Synopsis
Take your generated Capsule to new heights by adding NL training to search for
movies by name and actor.

## Plot
Make sure to complete the prequel puzzle first, as the Capsule generated there
is required to continue. The prequel ends with the wizard having created a
Capsule to search for movies. In this puzzle, you fly to a whole new world by
adding functionality to make full usage of the Models.

1. Take a few minutes to familiarize yourself with the folder structure and
files in the newly created "playground.movieSearch" Capsule. Pay special attention to
the Actions in the models/actions folder. Notice how the FindMovie Action can
search for movies by Name or Actor, and the FindActor Action can search for
Actor by ActorName. When chained together, these models enable finding a movie
by actor name. You will now train Bixby to recognize such requests from natural
language, whether it be English or another supported language.

2. Think about how you would request movies by title and/or actor. For example,
"Tell me about the Men In Black movie", “What movie stars Tessa Thompson?”. Open
the training UI and [add NL
training](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training)
for these unique formulations. Annotate the goal to be `Movie`. Annotate the
values to be `Name` for movie titles and `ActorName` for actor names.

3. Compile the NL Model and iteratively  add more training examples until
everything is [well
learned](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training#learned-vs-not-learned-training).

4. Update the Movie Result Dialog to echo out the trained search inputs from the
FindMovie Action. For example, "Here is the movie called 'Men In Black:
International' with 'Tessa Thompson'"

  > *Tip: You can [inspect the Dialogs in the Debug
Console](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging#dialogs).
From there, you can click on the target circle to expand the dialog into its
subcomponents, each with a link to jump to the source code file behind it.*

  > *Tip: Check out how you can utilize [value dialog fragment](https://bixbydevelopers.com/dev/docs/reference/ref-topics/dialog-modes.dialog-fragments#value-fragment) to customize the dialog*

  > *Tip: The following match patterns gives you a handle to the FindMovie Action*
```
Movie (this) {
  from-output: FindMovie(find)
}
```

## Rating
5 stars for asking Bixby "Tell me about the Aladdin movie that features Will
Smith." and the response showing the 2019 Aladdin movie with a dialog along the
lines of "Here is the movie called 'Aladdin' with 'Will Smith'".
