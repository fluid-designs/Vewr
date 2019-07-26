'use-strict';

// Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var OAuth = require('oauth');

require('dotenv').config();

// Application setup
const app = express();
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// DB setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Global variable declaration.
const PORT = process.env.PORT || 5000;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes
app.get('/search', getMovieAPIResults);
app.get('/movies', getMovieAPIResults);
app.post('/review', postUserReview);
app.get('/login', getUser);
app.get('/suggestions', getSuggestions);
app.get('/reviews', getUserReviews);
app.post('/tweet', postTweet);
app.delete('/review', deleteUserReview);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Ensures server is listening for requests
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31
function postTweet(request, response) {
  var twitter_application_consumer_key = process.env.TWITTER_API_KEY; // API Key
  var twitter_application_secret = process.env.TWITTER_API_SECRET; // API Secret
  var twitter_user_access_token = process.env.TWITTER_ACCESS_TOKEN; // Access Token
  var twitter_user_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET; // Access Token Secret

  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    twitter_application_consumer_key,
    twitter_application_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  // This is the tweet (ie status)
  var status = request.body.review;

  var postBody = {
    status: status
  };

  oauth.post(
    'https://api.twitter.com/1.1/statuses/update.json',
    twitter_user_access_token,
    twitter_user_secret,
    postBody,
    '',
    function(err, data, res) {
      if (err) {
        console.log(err);
      }

      return response.send({err});
    }
  );
}

// format time with AM or PM
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

// Get the current date and time
function getCurrentDateTime() {
  let today = new Date();
  let date = `${today.getMonth() +
    1}/${today.getDate()}/${today.getFullYear()}`;

  return `${date} ${formatAMPM(today)}`;
}

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

//Grabs Suggestions from API and send it back to Dashboard
function getSuggestions(request, response) {
  const suggestionsURL = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`;

  superagent
    .get(suggestionsURL)
    .then(res => {
      return res.body.results.map(movieData => new Movies(movieData));
    })
    .then(results => {
      response.send(results);
    })
    .catch(error => {
      console.log(error);
    });
}

//Grabs movies from our API
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

//Grabs user reviews to display on Dashboard
function getUserReviews(request, response) {
  const userReviewLookupSQL = `SELECT * FROM reviews INNER JOIN movies ON reviews.movie_id = movies.id WHERE reviews.user_id = $1 ORDER BY reviews.created_on DESC`;
  const userReviewLookupValues = [parseInt(request.query.data)];

  client
    .query(userReviewLookupSQL, userReviewLookupValues)
    .then(res => {
      response.send(res.rows);
    })
    .catch(e => console.error(e.stack));
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
  const movieSQL = `INSERT INTO movies (movie_id, title, synopsis, released_on, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const movieValues = [
    request.body.movie.movie_id,
    request.body.movie.title,
    request.body.movie.synopsis,
    request.body.movie.released_on,
    request.body.movie.image_url
  ];

  client
    .query(movieSQL, movieValues)
    .then(res => {
      const reviewSQL = `INSERT INTO reviews (review, rating, recommended, created_on, user_id, movie_id) VALUES ($1, $2, $3, $4, $5, $6)`;
      const reviewValues = [
        request.body.review.text,
        request.body.review.rating,
        request.body.review.recommended,
        getCurrentDateTime(),
        parseInt(request.body.user_id),
        res.rows[0].id
      ];

      client
        .query(reviewSQL, reviewValues)
        .then(res => {
          response.send('yay');
        })
        .catch(e => console.error(e.stack));
    })
    .catch(e => console.error(e.stack));
}

//Checks db if user exits and creates user if they do not exist.
function getUser(request, response) {
  const userLookupSQL = `SELECT * FROM users WHERE username = $1`;
  const userLookupValues = [request.query.data];

  const userInsertSQL = `INSERT INTO users (username) VALUES ($1) RETURNING *`;
  const userInsertValues = [request.query.data];

  client
    .query(userLookupSQL, userLookupValues)
    .then(res => {
      if (res.rows.length === 0) {
        client
          .query(userInsertSQL, userInsertValues)
          .then(res => {
            response.send([res.rows[0], true]);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        response.send([res.rows[0], false]);
      }
    })
    .catch(e => console.error(e.stack));
}

function deleteUserReview(request, response) {
  const userId = parseInt(request.query.userId);
  const movieId = parseInt(request.query.movieId);

  const deleteReviewSQL = `DELETE FROM reviews WHERE reviews.movie_id = $1 AND reviews.user_id = $2`;
  const deleteReviewValues = [movieId, userId];

  client
    .query(deleteReviewSQL, deleteReviewValues)
    .then(res => {
      const userReviewLookupSQL = `SELECT * FROM reviews INNER JOIN movies ON reviews.movie_id = movies.id WHERE reviews.user_id = $1 ORDER BY reviews.created_on DESC`;
      const userReviewLookupValues = [userId];
    
      client
        .query(userReviewLookupSQL, userReviewLookupValues)
        .then(res => {
          response.send(res.rows);
        })
        .catch(e => console.error(e.stack));
    })
    .catch(e => console.error(e.stack));
}
