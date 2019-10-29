import csv
import requests

API_KEY = "b9abb9a41b070db8a1c143a9253d1c46"
BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

movies_data = open('../1_movies.csv', 'w')
movies_writer = csv.writer(movies_data)
movies_writer.writerow(["id", "name", "posterImage", "*actors*", "'-description"])

actors_data = open('../2_actors.csv', 'w')
actors_writer = csv.writer(actors_data)
actors_writer.writerow(["actorId", "actorName", "profileImage"])

movies_resp = requests.get('https://api.themoviedb.org/3/trending/movie/week?api_key=' + API_KEY)
movies = movies_resp.json()["results"]
all_actors = []

for movie in movies:
    actors_resp = requests.get('https://api.themoviedb.org/3/movie/' + str(movie["id"]) + '/credits?api_key=' + API_KEY)
    actors = actors_resp.json()["cast"][0:3]
    for actor in actors:
        if actor["id"] not in all_actors:
            all_actors.append(actor["id"])
            actors_writer.writerow([actor["id"], actor["name"], BASE_IMAGE_URL+actor["profile_path"]])
    movies_writer.writerow([movie["id"], movie["title"], BASE_IMAGE_URL+movie["poster_path"],
                            ",".join(map(lambda c: str(c["id"]), actors)),
                            movie["overview"]])


actors_data.close()
movies_data.close()
