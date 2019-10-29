# El Niño

## Prequel
[Blue Steel](../intermediate/blue-steel.md)

## Audience
Challenge (Rated R - Enter at your own risk)

## Starring
- Bixby Hands Free

## Synopsis
Build a HEF (Hands-Eye Free) experience using navigation support.

## Plot
Make sure to complete the prequel puzzle first, as the Models built there are
required to continue. In the following steps, you will be creating layouts with
Bixby Views and ensuring there is proper support for a fully hands-free
navigation experience.

1. In the prequel, you made the movie credits accessible via a button. Go ahead
and [add continuation
training](https://bixbydevelopers.com/dev/docs/dev-guide/developers/training.intro-training#add-training-examples-for-continuations)
to make it possible to also access the movie credits using voice. Use
`FetchMovieCredits` as the goal and `Movie` as the context.

2. Also add continuation training to pivot to the cast and crew from the movie
credits. Use `Credits` as the context and `Credits#cast` and `Credits#crew` as
the respective goals. These goals with the `#` are effectively [property
projections](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts.property-projections).

  > *Pro tip: Make sure cast and crew are
[public](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts.property-projections#property-visibility)
for the planner to see them*

3. Add or update the movie credits `result-view` with conversation drivers to go
to the cast and crew.

4. Implement custom [hands-free list
navigation](https://bixbydevelopers.com/dev/docs/dev-guide/developers/enhancing-UX.list-navigation)
for cast and crew.
  1. Add a `result-view` for Cast with navigation support to
read-one-and-next.
  2. Add a `result-view` for Crew with navigation support to
read-one for each department name, where going to department will read all the
crew members in that department.
  3. Add a `result-view` for Department to `read-one-and-next`.

  > *Pro tip: Try using [Expression Language function `joinAs()`](https://bixbydevelopers.com/dev/docs/reference/ref-topics/el-ref#formatting-functions)
to form a dialog with all crew members*

## Rating
5 stars to find the Zoolander 2 movie and browse the cast and crew members using
voice only.
