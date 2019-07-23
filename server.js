'use-strict';

//Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');

require('dotenv').config();

//Application setup
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

//DB setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//API Routes
// app.get('/search', getSearchResults);
app.get('/movies', getMovieAPIResults);

//Ensures server is listening for requests
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//Error Handling
function handleError(err, result) {
  console.error(err);
  if (result) result.status(500).send('Something went wrong internal error');
}

//Movies Constructor
function Movies(movie) {
  this.tableName - 'movies';
  this.title = movie.original_title;
  this.synopsis = movie.overview;
  this.released_on = movie.released_date;
  this.image_url =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}` || 'Image';
}

function getMovieAPIResults(request, response) {
  const movieTitle = 'Avengers';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.MOVIE_API_KEY
  }&query=${movieTitle}`;

  superagent
    .get(url)
    .then(result => {
      const movies = result.body.results.map(movieData => {
        const movie = new Movies(movieData);
        // movie.save(request.query.data.id);

        console.log('movie: ', movie);
        return movie;
      });
      console.log('movies: ', movies);
      response.send(movies);
    })
    .catch(error => handleError(error, response));
}

//TODO: Implement lookup from DB
//Movies.lookup = lookup;

// Look for the results in the database
// function lookup(options) {
//   const SQL = `SELECT * FROM ${options.tableName} WHERE location_id=$1;`;
//   const values = [options.location];

//   client
//     .query(SQL, values)
//     .then(result => {
//       if (result.rowCount > 0) {
//         options.cacheHit(result);
//       } else {
//         options.cacheMiss();
//       }
//     })
//     .catch(error => handleError(error));
// }

//Save into DB
// Movies.prototype = {
//   save: function(user_id) {
//     const SQL = `INSERT INTO ${
//       this.tableName
//     } (title, synopsis, released_on, image_url, user_id) VALUES ($1, $2, $3, $4, $5);`;

//     const values = [
//       this.title,
//       this.synopsis,
//       this.released_on,
//       this.image_url,
//       this.user_id
//     ];

//     client.query(SQL, values);
//   }
// };

// function getMovies(request, response) {
//   Movies.lookup({
//     tableName: Movies.tableName,

//     location: request.query.data.id,

//     cacheHit: function (result) {

//       response.send(result.rows);
//     },

//     cacheMiss: function () {
//       const locationName = request.query.data.search_query;
//       const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${locationName}`;

//       superagent.get(url)
//         .then(result => {
//           const movies = result.body.results.map(movieData => {
//             const movie = new Movies(movieData);
//             movie.save(request.query.data.id);
//             return movie;
//           });

//           response.send(movies);
//         })
//         .catch(error => handleError(error, response));
//     }
//   })
// }

//TODO: circle back for social media API
