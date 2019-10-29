# Don't Stop Me Now

## Prequel
None

## Audience
Intermediate (Rated PG – Prior grounding suggested)

## Starring
- Bixby Conversation
 - Continuation Training
 - Conversation Drivers
 - Relaxation

## Synopsis
Keep the conversation going indefinitely with continuation training,
conversation drivers and relaxation.

## Plot
1. Warm up by running a query to find some movies.

  > *Tip: The [README file](../../../README.md) explains how to run this Capsule
and provides example utterances*

  What if you're not in the mood for any of these movies? Let’s see how to keep
the conversation going to refine the results.

2. Get familiar with the FindMovie model and what inputs it supports by taking a
peek at the `FindMovie.model.bxb` file.

  > *Tip: There’s a [keyboard
shortcut](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.cheatsheet#view)
to quickly jump to go to a file by name*

  > *Pro tip: You can use the [Command
Palette](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.basics#keyboard-shortcuts)
to quickly execute commands and find shortcuts*

3. Now have a look at the corresponding [NL
training](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training).
Open the Training UI and study the training examples that have Movie as the goal
(use `goal:Movie` in your search query).

4. Add specialized [Continuation
training](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training#add-training-examples-for-continuations)
to pickup from the Movie context and relaunch the conversation with refined
inputs. In particular, add continuation training for the movie genre (“in the
fantasy genre”), who contributed to the movie (“with Jackie Chan”) and when the
movie was released (“released last year”). Compile the NL Model and iteratively
add more training examples until everything is [well learned](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training#learned-vs-not-learned-training).

5. To inform the user that they can use these continuations when looking at the
results, add some [conversation
drivers](https://bixbydevelopers.com/dev/docs/dev-guide/developers/enhancing-UX.guiding-conversations#conversation-drivers).
Open the `Movie_Result.view.bxb` file and add 3 conversation drivers: one for
genre, one for person, and one for time. The text for these should be similar to
the continuation training you added earlier.

  > *Tip: Here is a code example that produces 2 conversation drivers. Where in
  the file would it belong? It should be a direct child of `result-view`, on the
  same level as the `render` block.*
  ```
  conversation-drivers {
    conversation-driver {
      template ("<text 1>")
    }
    conversation-driver {
      template ("<text 2>")
    }
  }
  ```

  > *Tip: You can customize the experience with [control
  flows](https://bixbydevelopers.com/dev/docs/reference/ref-topics/control-flows).
  For example, you can use
  [choose(Random)](https://bixbydevelopers.com/dev/docs/reference/ref-topics/control-flows#choose)
  to add a variety of template options that will be sampled at runtime. Or you
  can decide to show different templates based on the size of the results by
  adding conditional checks around `size(results)`*

  > *Pro tip: You can also condition your recommendations based on the current
action inputs, to avoid recommending a value that was already mentioned by the
user. To get a handle to the FindMovie action, you can update the match-pattern
with `from-output: FindMovie(action)`*

  You may have realized that stacking too many search criteria in a row may lead
to over-constraining the search, especially if the inputs are incompatible. For
example, "Find 1999 sci-fi movies." followed by "produced by Alfred Hitchcock")
would be impossible. Relax. To help prevent dead-ends, we can automatically drop
earlier inputs using a feature called
[relaxation](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts.relaxation).
Indeed, if you have a closer look at the `FindMovie.model.bxb` file, you can
observe an
[output.on-empty](https://bixbydevelopers.com/dev/docs/reference/type/action.output.on-empty)
block is defined to drop the previous contextual inputs.

  > *Pro tip: You can build your own logic to decide which inputs to drop or use
[drop-contextual-inputs](https://bixbydevelopers.com/dev/docs/reference/type/action.output.on-empty.drop-contextual-inputs)
to drop the older inputs and keep the incoming ones*

5. Use the Device Simulator to try out your work.

## Rating
5 stars for conversation drivers that can be used to pivot around indefinitely.
Can we ask complex continuations like “only movies where the producer is James
Cameron” or "released in 2010 and featuring Marion Cotillard"?
