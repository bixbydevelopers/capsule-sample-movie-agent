var dates = require('dates')
var http = require('http')
var properties = require('./properties.js')
var movieGenreMap = require('./movieGenreMap.js')

module.exports = {
  discoverMovie: discoverMovie,
  getConfiguration: getConfiguration,
  getMovie: getMovie,
  getMovieCredits: getMovieCredits,
  getTrendingMovies: getTrendingMovies,
  searchPerson: searchPerson,
}

function discoverMovie(releaseDateTimeExpression, person, genre) {
  const url = "https://api.themoviedb.org/3/discover/movie"
  const query = {
    "api_key": properties.get("secret", "apiKey")
  }
  if (releaseDateTimeExpression) {
    Object.assign(query, buildReleaseQuery(releaseDateTimeExpression))
  }
  if (person) {
    query["with_people"] = person.$id
  }
  if (genre) {
    query["with_genres"] = mapMovieGenre(genre)
  }
  const options = {
    "format": "json",
    "query": query
  }
  const response = http.getUrl(url, options)
  return response
}

function getConfiguration() {
  const url = "https://api.themoviedb.org/3/configuration"
  const query = {
    "api_key": properties.get("secret", "apiKey")
  }
  const options = {
    "format": "json",
    "query": query,
    "cacheTime": 86400000, // 1 day cache time
  }
  const response = http.getUrl(url, options)
  return response
}

function getMovie(movie) {
  if (movie) {
    const url = "https://api.themoviedb.org/3/movie/" + movie.$id
    const query = {
      "api_key": properties.get("secret", "apiKey")
    }
    const options = {
      "format": "json",
      "query": query
    }
    const response = http.getUrl(url, options)
    return response
  }
}

function getMovieCredits(movie) {
  if (movie) {
    const url = "https://api.themoviedb.org/3/movie/" + movie.$id + "/credits"
    const query = {
      "api_key": properties.get("secret", "apiKey")
    }
    const options = {
      "format": "json",
      "query": query
    }
    const response = http.getUrl(url, options)
    return response
  }
}

function getTrendingMovies(dateTimeExpression) {
  const inputType = "viv.time.DateTimeExpression"
  // Default to now
  dateTimeExpression = dateTimeExpression || {
    dateTime: dates.ZonedDateTime.now().getDateTime(),
    $type: inputType
  }
  if (dateTimeExpression["$type"] === inputType) {
    const url = "https://api.themoviedb.org/3/trending/movie/" + buildTrendingWindow(dateTimeExpression)
    const query = {
      "api_key": properties.get("secret", "apiKey")
    }
    const options = {
      "format": "json",
      "query": query
    }
    const response = http.getUrl(url, options)
    return response
  } else {
    throw "Unrecognized input type. Expected " + inputType + ". Got: " + JSON.stringify(dateTimeExpression)
  }
}

function searchPerson(name) {
  if (name) {
    const url = "https://api.themoviedb.org/3/search/person"
    const query = {
      "api_key": properties.get("secret", "apiKey")
    }
    if (name) {
      query["query"] = name
    }
    const options = {
      "format": "json",
      "query": query
    }
    const response = http.getUrl(url, options)
    return response
  }
}

function mapMovieGenre(bxbGenre) {
  bxbGenre = String(bxbGenre)
  for (var jsGenre in movieGenreMap) {
    if (movieGenreMap[jsGenre]["bxb"] === bxbGenre) {
      return movieGenreMap[jsGenre]["tmdbId"]
    }
  }
}

function buildReleaseQuery(releaseDateTimeExpression) {
  if (releaseDateTimeExpression) {
    if (releaseDateTimeExpression.date) {
      return buildPunctualReleaseQuery(inflateDate(releaseDateTimeExpression.date))
    }
    if (releaseDateTimeExpression.dateTime) {
      return buildPunctualReleaseQuery(inflateDateTime(releaseDateTimeExpression.dateTime))
    }
    if (releaseDateTimeExpression.dateInterval) {
      return buildIntervalReleaseQuery(inflateDate(releaseDateTimeExpression.dateInterval.start), inflateDate(releaseDateTimeExpression.dateInterval.end))
    }
    if (releaseDateTimeExpression.dateTimeInterval) {
      return buildIntervalReleaseQuery(inflateDateTime(releaseDateTimeExpression.dateTimeInterval.start), inflateDateTime(releaseDateTimeExpression.dateTimeInterval.end))
    }
  }
}

function buildPunctualReleaseQuery(zonedDateTime) {
  if (zonedDateTime) {
    return {
      "primary_release_year": zonedDateTime.getYear()
    }
  }
}

function buildIntervalReleaseQuery(zonedDateTimeStart, zonedDateTimeEnd) {
  const query = {}
  if (zonedDateTimeStart) {
    query["primary_release_date.gte"] = zonedDateTimeStart.toIsoString()
  }
  if (zonedDateTimeEnd) {
    query["primary_release_date.lte"] = zonedDateTimeEnd.toIsoString()
  }
  return query
}

function buildTrendingWindow(dateTimeExpression) {
  const now = dates.ZonedDateTime.now()
  if (dateTimeExpression) {
    if (dateTimeExpression.date) {
      return buildPunctualTrendingWindow(now, inflateDate(dateTimeExpression.date))
    }
    if (dateTimeExpression.dateTime) {
      return buildPunctualTrendingWindow(now, inflateDateTime(dateTimeExpression.dateTime))
    }
    if (dateTimeExpression.dateInterval) {
      return buildPunctualTrendingWindow(now, inflateDate(dateTimeExpression.dateInterval.start))
    }
    if (dateTimeExpression.dateTimeInterval) {
      return buildPunctualTrendingWindow(now, inflateDateTime(dateTimeExpression.dateTimeInterval.start))
    }
  }
}

function buildPunctualTrendingWindow(now, zonedDateTime) {
  if (now && zonedDateTime) {
    if (zonedDateTime.isBeforeOrEqualTo(now)) {
      const daysUntil = zonedDateTime.durationUntil(now, 'Days').periodDays
      if (daysUntil <= 1) {
        return "day"
      }
      if (daysUntil <= 7) {
        return "week"
      }
    }
  }
  throw "Unsupported trending window. Expected zonedDateTime up to 1 week ago. Got " + JSON.stringify(zonedDateTime)
}

function buildIntervalTrendingWindow(now, zonedDateTimeStart, zonedDateTimeEnd) {
  if (now) {
    buildPunctualTrendingWindow(now, zonedDateTimeEnd) // This will throw an error if the end is out of bounds
    return buildPunctualTrendingWindow(now, zonedDateTimeStart)
  }
}

function inflateDate(date) {
  if (date) {
    return dates.ZonedDateTime.fromDate(date)
  }
}

function inflateDateTime(dateTime) {
  if (dateTime) {
    return dates.ZonedDateTime.fromDateTime(dateTime)
  }
}
