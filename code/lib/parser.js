var dates = require('dates')
var tmdb = require('./TMDB.js')
var movieGenreMap = require('./movieGenreMap.js')

module.exports = {
  parseCredits: parseCredits,
  parseMovieDetails: parseMovieDetails,
  parseMovies: parseMovies,
  parsePeople: parsePeople
}

function parseCredits(tmdbResponse) {
  if (tmdbResponse) {
    const configuration = tmdb.getConfiguration()
    return {
      cast: parseCast(tmdbResponse.cast, configuration),
      crew: parseCrew(tmdbResponse.crew, configuration)
    }
  }
}

function parseCast(rawCast, configuration) {
  if (rawCast) {
    return rawCast.map(function (rawCastMember) {
      return {
        name: rawCastMember.name,
        profileUrl: constructImageUrl(configuration.images.base_url, "original", rawCastMember.profile_path),
        character: rawCastMember.character
      }
    })
  }
}

function parseCrew(rawCrew, configuration) {
  if (rawCrew) {
    // Group crew members by departments
    return rawCrew.reduce(function (departments, rawCrewMember) {
      var departmentIndex = departments.findIndex(function (department) {
        return department.department === rawCrewMember.department
      })
      if (departmentIndex === -1) {
        departmentIndex = departments.push({
          department: rawCrewMember.department,
          team: []
        }) - 1
      }
      departments[departmentIndex].team.push({
        name: rawCrewMember.name,
        profileUrl: constructImageUrl(configuration.images.base_url, "original", rawCrewMember.profile_path),
        job: rawCrewMember.job
      })
      return departments
    }, [])
  }
}

function parseMovieDetails(tmdbResponse) {
  if (tmdbResponse) {
    return {
      budget: tmdbResponse.budget,
      overview: tmdbResponse.overview,
      revenue: tmdbResponse.revenue,
      runtime: {
        periodMinutes: tmdbResponse.runtime
      },
      tagline: tmdbResponse.tagline
    }
  }
}

function parseMovies(tmdbResponse) {
  if (tmdbResponse && tmdbResponse.results && tmdbResponse.results.length > 0) {
    const configuration = tmdb.getConfiguration()
    return tmdbResponse.results.map(function (rawMovie) {
      return parseMovie(rawMovie, configuration)
    })
  }
}

function parseMovie(rawMovie, configuration) {
  if (rawMovie && configuration) {
    return {
      $id: rawMovie.id,
      title: rawMovie.title,
      releaseDate: parseReleaseDate(rawMovie.release_date),
      genre: rawMovie.genre_ids.map(function (id) {
        return parseMovieGenre(id)
      }).filter(x => x),
      posterUrl: constructImageUrl(configuration.images.base_url, "original", rawMovie.poster_path),
      backdropUrl: constructImageUrl(configuration.images.base_url, "original", rawMovie.backdrop_path),
    }
  }
}

function parseReleaseDate(rawReleaseDate) {
  if (rawReleaseDate) {
    return dates.ZonedDateTime.parseDate(rawReleaseDate, 'uuuu-MM-dd').getDateTime().date
  }
}

function parseMovieGenre(tmdbId) {
  for (var jsGenre in movieGenreMap) {
    if (movieGenreMap[jsGenre]["tmdbId"] === tmdbId) {
      return movieGenreMap[jsGenre]["bxb"]
    }
  }
}

function parsePeople(tmdbResponse) {
  if (tmdbResponse && tmdbResponse.results && tmdbResponse.results.length > 0) {
    const configuration = tmdb.getConfiguration()
    return tmdbResponse.results.map(function (rawPerson) {
      return parsePerson(rawPerson, configuration)
    })
  }
}

function parsePerson(rawPerson, configuration) {
  if (rawPerson && configuration) {
    return {
      $id: rawPerson.id,
      name: rawPerson.name,
      profileUrl: constructImageUrl(configuration.images.base_url, "original", rawPerson.profile_path),
    }
  }
}

function constructImageUrl(baseUrl, size, endingUrl) {
  if (baseUrl && size && endingUrl) {
    return baseUrl + size + endingUrl;
  }
}
