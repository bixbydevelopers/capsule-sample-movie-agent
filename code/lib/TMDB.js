import ZonedDateTime from './zoned-date-time-polyfill.js';
import http from 'http';
import * as properties from "./properties.js";
import movieGenreMap from "./movieGenreMap.js";
import console from "console";

export function discoverMovie(releaseDateTimeExpression, person, genre, $vivContext) {
  const url = 'https://api.themoviedb.org/3/discover/movie';
  const query = {
    api_key: properties.get('secret', 'apiKey'),
  };
  if (releaseDateTimeExpression) {
    Object.assign(query, buildReleaseQuery(releaseDateTimeExpression, $vivContext));
  }
  if (person) {
    query['with_people'] = person.$id;
  }
  if (genre) {
    query['with_genres'] = mapMovieGenre(genre);
  }
  const options = {
    format: 'json',
    query: query,
  };
  const response = http.getUrl(url, options);
  return response;
}

export function getConfiguration() {
  const url = 'https://api.themoviedb.org/3/configuration';
  const query = {
    api_key: properties.get('secret', 'apiKey'),
  };
  const options = {
    format: 'json',
    query: query,
    cacheTime: 86400000, // 1 day cache time
  };
  const response = http.getUrl(url, options);
  return response;
}

export function getMovie(movie) {
  if (movie) {
    const url = 'https://api.themoviedb.org/3/movie/' + movie.$id;
    const query = {
      api_key: properties.get('secret', 'apiKey'),
    };
    const options = {
      format: 'json',
      query: query,
    };
    const response = http.getUrl(url, options);
    return response;
  }
}

export function getMovieCredits(movie) {
  if (movie) {
    const url = 'https://api.themoviedb.org/3/movie/' + movie.$id + '/credits';
    const query = {
      api_key: properties.get('secret', 'apiKey'),
    };
    const options = {
      format: 'json',
      query: query,
    };
    const response = http.getUrl(url, options);
    return response;
  }
}

export function getTrendingMovies(dateTimeExpression, $vivContext) {
  ZonedDateTime.setVivContext($vivContext);
  const inputType = 'viv.time.DateTimeExpression';
  // Default to now
  dateTimeExpression = dateTimeExpression || {
    dateTime: ZonedDateTime.now().getDateTime(),
    $type: inputType,
  };
  if (dateTimeExpression['$type'] === inputType) {
    const url =
      'https://api.themoviedb.org/3/trending/movie/' +
      buildTrendingWindow(dateTimeExpression);
    const query = {
      api_key: properties.get('secret', 'apiKey'),
    };
    const options = {
      format: 'json',
      query: query,
    };
    const response = http.getUrl(url, options);
    return response;
  } else {
    throw (
      'Unrecognized input type. Expected ' +
      inputType +
      '. Got: ' +
      JSON.stringify(dateTimeExpression)
    );
  }
}

export function searchPerson(name) {
  if (name) {
    const url = 'https://api.themoviedb.org/3/search/person';
    const query = {
      api_key: properties.get('secret', 'apiKey'),
    };
    if (name) {
      query['query'] = name;
    }
    const options = {
      format: 'json',
      query: query,
    };
    const response = http.getUrl(url, options);
    return response;
  }
}

function mapMovieGenre(bxbGenre) {
  bxbGenre = String(bxbGenre);
  for (var jsGenre in movieGenreMap) {
    if (movieGenreMap[jsGenre]['bxb'] === bxbGenre) {
      return movieGenreMap[jsGenre]['tmdbId'];
    }
  }
}

function buildReleaseQuery(releaseDateTimeExpression, $vivContext) {
  if (releaseDateTimeExpression) {
    if (releaseDateTimeExpression.date) {
      return buildPunctualReleaseQuery(
        inflateDate(releaseDateTimeExpression.date, $vivContext)
      );
    }
    if (releaseDateTimeExpression.dateTime) {
      return buildPunctualReleaseQuery(
        inflateDateTime(releaseDateTimeExpression.dateTime, $vivContext)
      );
    }
    if (releaseDateTimeExpression.dateInterval) {
      return buildIntervalReleaseQuery(
        inflateDate(releaseDateTimeExpression.dateInterval.start, $vivContext),
        inflateDate(releaseDateTimeExpression.dateInterval.end, $vivContext)
      );
    }
    if (releaseDateTimeExpression.dateTimeInterval) {
      return buildIntervalReleaseQuery(
        inflateDateTime(releaseDateTimeExpression.dateTimeInterval.start),
        inflateDateTime(releaseDateTimeExpression.dateTimeInterval.end)
      );
    }
  }
}

function buildPunctualReleaseQuery(zonedDateTime) {
  if (zonedDateTime) {
    return {
      primary_release_year: zonedDateTime.getYear(),
    };
  }
}

function buildIntervalReleaseQuery(zonedDateTimeStart, zonedDateTimeEnd) {
  const query = {};
  if (zonedDateTimeStart) {
    query['primary_release_date.gte'] = zonedDateTimeStart.toIsoString();
  }
  if (zonedDateTimeEnd) {
    query['primary_release_date.lte'] = zonedDateTimeEnd.toIsoString();
  }
  return query;
}

function buildTrendingWindow(dateTimeExpression, $vivContext) {
  ZonedDateTime.setVivContext($vivContext);
  const now = ZonedDateTime.now();
  if (dateTimeExpression) {
    if (dateTimeExpression.date) {
      return buildPunctualTrendingWindow(
        now,
        inflateDate(dateTimeExpression.date, $vivContext)
      );
    }
    if (dateTimeExpression.dateTime) {
      return buildPunctualTrendingWindow(
        now,
        inflateDateTime(dateTimeExpression.dateTime, $vivContext)
      );
    }
    if (dateTimeExpression.dateInterval) {
      return buildPunctualTrendingWindow(
        now,
        inflateDate(dateTimeExpression.dateInterval.start, $vivContext)
      );
    }
    if (dateTimeExpression.dateTimeInterval) {
      return buildPunctualTrendingWindow(
        now,
        inflateDateTime(dateTimeExpression.dateTimeInterval.start, $vivContext)
      );
    }
  }
}

function buildPunctualTrendingWindow(now, zonedDateTime) {
  if (now && zonedDateTime) {
    if (zonedDateTime.isBeforeOrEqualTo(now)) {
      const daysUntil = zonedDateTime.durationUntil(now, 'Days').periodDays;
      if (daysUntil <= 1) {
        return 'day';
      }
      if (daysUntil <= 7) {
        return 'week';
      }
    }
  }
  throw (
    'Unsupported trending window. Expected zonedDateTime up to 1 week ago. Got ' +
    JSON.stringify(zonedDateTime)
  );
}

function buildIntervalTrendingWindow(
  now,
  zonedDateTimeStart,
  zonedDateTimeEnd
) {
  if (now) {
    buildPunctualTrendingWindow(now, zonedDateTimeEnd); // This will throw an error if the end is out of bounds
    return buildPunctualTrendingWindow(now, zonedDateTimeStart);
  }
}

function inflateDate(date, $vivContext) {
  ZonedDateTime.setVivContext($vivContext);
  
  if (date) {
    return ZonedDateTime.fromDate(date);
  }
}

function inflateDateTime(dateTime, $vivContext) {
  ZonedDateTime.setVivContext($vivContext);
  if (dateTime) {
    return ZonedDateTime.fromDateTime(dateTime);
  }
}
