# Yer A Wizard

## Prequel
None

## Audience
Newcomer (Rated G - General Audiences)

## Starring
- Bixby Templates

## Synopsis
Create a new Capsule to search for movies using the brand new Bixby Templates.

## Plot
In this puzzle, you will use the Bixby Studio wizard to generate a Capsule that
searches for movies in data files. The [csv](./csv) folder contains movie and
actors data from [The Movie DB](https://www.themoviedb.org) in the form of
spreadsheet tables as comma-separated values (csv format). Here's a sample:

1_movies.csv - recently trending movies.

| id | name | posterImage | \*actors\* | '-description |
|--------|--------|--------|--------|--------|
| 429617 | Spider-Man: Far from Home | [image url](https://image.tmdb.org/t/p/w600_and_h900_bestv2/lcq8dVxeeOqHvvgcte707K0KVx5.jpg) | "1136406,131,505710" | Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent. |
| 301528 | Toy Story 4 | [image url](https://image.tmdb.org/t/p/w600_and_h900_bestv2/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg) | "31,12898,8873" | Woody has always been confident about his place in the world and that his priority is taking care of his kid, whether that's Andy or Bonnie. But when Bonnie adds a reluctant new toy called "Forky"" to her room | a road trip adventure alongside old and new friends will show Woody how big the world can be for a toy." |
| 320288 | Dark Phoenix | [image url](https://image.tmdb.org/t/p/w600_and_h900_bestv2/cCTJPelKGLhALq3r51A9uMonxKj.jpg) | "1001657,5530,17288" | The X-Men face their most formidable and powerful foe when one of their own, Jean Grey, starts to spiral out of control. During a rescue mission in outer space, Jean is nearly killed when she's hit by a mysterious cosmic force. Once she returns home, this force not only makes her infinitely more powerful, but far more unstable. The X-Men must now band together to save her soul and battle aliens that want to use Grey's new abilities to rule the galaxy. |

2_actors.csv - actors for recently trending movies

| actorId | actorName | profileImage |
|--------|--------|--------|
| 1136406 | Tom Holland | [image url](https://image.tmdb.org/t/p/w600_and_h900_bestv2/ip7aXVH8s6wXv8cY6KI14OZgCI8.jpg) |
| 131 | Jake Gyllenhaal | [image url](https://image.tmdb.org/t/p/w600_and_h900_bestv2/92sBuFC8tWPG7IqGDJNxysT7tIF.jpg) |
| 505710 | Zendaya | [image url](https://image.tmdb.org/t/p/w600_and_h900_bestv2/r3A7ev7QkjOGocVn3kQrJ0eOouk.jpg) |

1. Use the Bixby Studio wizard to [create a new capsule from template](https://bixbydevelopers.com/dev/docs/sample-capsules/templates).
When prompted to select a template, choose the option to `Import and Search Template`

2. Click on "Upload CSV" and select the
[./csv/1_movies.csv](./csv/1_movies.csv) file from this repo. Use "Movie" as the
concept name.

3. Click on the "+" button to "Add CSV". Click on "Upload CSV" and
select the [./csv/2_actors.csv](./csv/2_actors.csv) file from this repo. Use
"Actor" as the concept name.

4. Click on "Next Step" and provide the Capsule Info. You can use
"playground.movieSearch" as the namespace and keep the default path.

5. Click "Generate Capsule" and let the Bixby Studio wizard do its magic to
materialize a Capsule from the provided information.

6. Open the [Device
Simulator](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.simulator),
select the newly created capsule "playground.movieSearch" and compile NL.

7. Ask Bixby to "Show all movies". You should now see movies from the first
table listed on the simulator window. Tap on some movies to see details. You
should see the actors with the actors being pulled in from the second table.

You can continue to the [A Magic Carpet
Ride](../beginner/a-magic-carpet-ride.md) puzzle to fly your Capsule to new
heights.

## Rating
5 stars for running a query to show all movies.
