
import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import superagent from "superagent";

require('dotenv').config();

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.match.params.query,
      movies: [],
      promiseIsResolved: false
    };
  }

  componentDidMount() {
    // make request off of query parameter being passed from dashboard.js
    superagent
      .get('/movies')
      .query({
        data: this.state.query,
        url: 'movies'
      })
      .then(result => {
        this.setState({
          movies: result.body,
          promiseIsResolved: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const waitForAsync = () => {
      if (!this.state.promiseIsResolved) {
        return null;
      } else {
        if (this.state.movies.length === 0) {
          return <div>
            <p>Sorry no movies were found.</p>
            <Link to="/dashboard">
              Please Try again.
            </Link>
          </div>

        } else {
          return <ul className="movie-list">
            {this.state.movies.map(movie => {
              return <li key={movie.movie_id}>
                <div className="movie-poster"><Link to={`/review/${movie.movie_id}`}><img src={movie.image_url} alt={movie.title} /></Link></div>
                <div>
                  <Link to={`/review/${movie.movie_id}`}>
                    <h3>{movie.title.toUpperCase()}</h3>
                  </Link>
                  <p className="synopsis">{movie.synopsis}</p>
                </div>
              </li>
            })}
          </ul>
        }
      }
    };

    return (
      <Fragment>
        <div id="Search" className="component-container">
          <h1>Search results</h1>
          {waitForAsync()}
        </div>
      </Fragment>
    );
  }
}
