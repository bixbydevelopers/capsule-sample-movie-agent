# The Quiz Show

## Prequel
None

## Audience
Newcomer (Rated G - General Audiences)

## Starring
- Bixby Studio
  - Editor
  - Device Simulator
  - Debug Console

## Synopsis
Get familiar with the Bixby Studio Editor, Simulator, and Debug Console by
syncing, modifying, and running a Capsule. Compose and play a personality type
quiz.

## Plot

1. If you haven't done so already, hop over to the [Capsule README
file](../../../README.md) to get familiar with this Capsule and run a few
queries.

2. Use the [Device
Simulator](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.simulator)
to play the movie quiz.

  > *Tip: Example utterances are listed in the [Capsule README
file](../../../README.md)*

3. Open the `quizQuestions.js` file in the Editor window.

  > *Tip: There’s a [keyboard
shortcut](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.cheatsheet#view)
to quickly jump to go to a file by name*

  > *Pro tip: You can use the [Command
Palette](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.basics#keyboard-shortcuts)
to quickly execute commands and find shortcuts*

4. Study the comment at the top of the file to understand how the quiz works.

5. Replace all the existing quiz questions with a new set that you create yourself.

6. Play your quiz in the Simulator.

7. Open the [Debug
Console](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging).

8. Find the node with your completed quiz in the [Plan Execution
Graph](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging#the-execution-graph).

9. Use the
[Inspector](https://bixbydevelopers.com/dev/docs/dev-guide/developers/testing.debugging#the-inspector)
pane to inspect it.

## Rating
5 stars for identifying the completed quiz node in the Debug Console with the
`completed` property `true` and the `questions` being your original creation.
