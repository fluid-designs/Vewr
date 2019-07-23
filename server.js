'use-strict';

// Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser')

require('dotenv').config();


// Application setup
const app = express();
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// DB setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Global variable declaration.
const PORT = process.env.PORT || 5000;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

// API Routes
app.get('/search', getMovieAPIResults);
app.get('/movies', getMovieAPIResults);
app.post('/review', postUserReview);

// Ensures server is listening for requests
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Error Handling
function handleError(err, result) {
  console.error(err);
  if (result) result.status(500).send('Something went wrong internal error');
}

// Movies Constructor
function Movies(movie) {
  this.tableName = 'movies';
  this.movie_id = movie.id;
  this.title = movie.original_title;
  this.synopsis = movie.overview;
  this.released_on = movie.released_date;
  this.image_url =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}` || 'Image';
}

function getMovieAPIResults(request, response) {
  const url = urlBuilder(request);

  superagent
    .get(url)
    .then(res => {
      let resultData = dataBuilder(res);
      response.send(resultData);
    })
    .catch(error => handleError(error, response));
}

// Function to determine proper url to supply API route.
function urlBuilder(request) {
  const searchTarget = request.query.data;
  const searchType = request.query.url;
  let url = '';
  switch (searchType) {
    case 'movies':
      url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchTarget}`;
      break;
    case 'search':
      url = `https://api.themoviedb.org/3/movie/${searchTarget}?api_key=${MOVIE_API_KEY}&language=en-US`;
      break;
    default:
      url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchTarget}`;
  }
  return url;
}

// Function to determine return proper data object from API.
function dataBuilder(res) {
  if (Array.isArray(res.body.results)) {
    return res.body.results.map(movieData => new Movies(movieData));
  } else {
    return new Movies(res.body);
  }
}

// Begin DB manipulation.
function postUserReview(request, response) {
  console.log('request.body: ', request.body);
  const movieSQL = `INSERT INTO movies (movie_id, title, synopsis, released_on, image_url) VALUES ($1, $2, $3, $4, $5)`;

  const reviewSQL = `INSERT INTO reviews (review, rating, recommended, created_on, user_id, movie_id) VALUES ($1, $2, $3, $4, $5, $6)`;

  const movieValues = [
    request.body.movie.movie_id,
    request.body.movie.title,
    request.body.movie.synopsis,
    request.body.movie.released_on,
    request.body.movie.image_url
  ];
  client.query(movieSQL, movieValues);

  const reviewValues = [
    request.body.review.text,
    request.body.review.rating,
    request.body.review.recommended,
    Date.now(),
    request.body.user_id,
    request.body.movie.movie_id,
  ];
  client.query(reviewSQL, reviewValues);

  return response.send('Success');
}

// request.body: {
//     user_id: '1',
//      movie: {
//         movie_id: '299534',
//            title: 'Avengers: Endgame',
//              overview: 'After the devastating events of Avengers: Infinity War, the ' +
//                   'universe is in ruins due to the efforts of the Mad Titan, Thanos. ' +
//                     'With the help of remaining allies, the Avengers must assemble once ' +
//                      "more in order to undo Thanos' actions and restore order to the " +
//                      'universe once and for all, no matter what consequences may be in ' +
//                          'store.',
//                         image_url: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
//                       
//     },
//      review: {
//      text: 'I love this movie. Now and always.',
//          rating: 1.4,
//            recommended: '0'
//        
//   }
//   
// }

// TODO: Implement lookup from DB
// Movies.lookup = lookup;

//  Look for the results in the database
//  function lookup(options) {
//    const SQL = `SELECT * FROM ${options.tableName} WHERE location_id=$1;`;
//    const values = [options.location];

//    client
//      .query(SQL, values)
//      .then(result => {
//        if (result.rowCount > 0) {
//          options.cacheHit(result);
//        } else {
//          options.cacheMiss();
//        }
//      })
//      .catch(error => handleError(error));
//  }

// Save into DB
//  Movies.prototype = {
//    save: function(user_id) {
//      const SQL = `INSERT INTO ${
//        this.tableName
//      } (title, synopsis, released_on, image_url, user_id) VALUES ($1, $2, $3, $4, $5);

//      const values = [
//        this.title,
//        this.synopsis,
//        this.released_on,
//        this.image_url,
//        this.user_id
//      ];

//      client.query(SQL, values);
//    }
//  };

//  function getMovies(request, response) {
//    Movies.lookup({
//      tableName: Movies.tableName,

//      location: request.query.data.id,

//      cacheHit: function (result) {

//        response.send(result.rows);
//      },

//      cacheMiss: function () {
//        const locationName = request.query.data.search_query;
//        const url = `https:// api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${locationName}`;

//        superagent.get(url)
//          .then(result => {
//            const movies = result.body.results.map(movieData => {
//              const movie = new Movies(movieData);
//              movie.save(request.query.data.id);
//              return movie;
//            });

//            response.send(movies);
//          })
//          .catch(error => handleError(error, response));
//      }
//    })
//  }

// TODO: circle back for social media API
