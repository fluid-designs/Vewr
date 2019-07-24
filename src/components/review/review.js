import React, { Fragment, Component } from 'react';
import superagent from 'superagent';

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_id: this.props.match.params.movie_id,
      movie: {},
      review: ''
    };
  }

  componentDidMount() {
    // Make a http get request using superagent
    // Save response into state as movie object

    superagent
      .get('/search')
      .query({
        data: this.state.movie_id,
        url: 'search'
      })
      .then(result => {
        console.log(result.body);
        this.setState({
          movie: result.body
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChange = event => {
    this.setState({
      review: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Review: ', this.state.review);
    // TODO Send post request to server which will save review into DB
    // Send an object which includes the user id, review, movie id, rating & recommend
    // Send movie details data movie_id, title, overview, released_on, image_url
    // Get user ID from local storage
    const data = {
      user_id: localStorage.getItem('userId'),
      movie: {
        movie_id: this.state.movie_id,
        title: this.state.movie.title,
        synopsis: this.state.movie.synopsis,
        released_on: this.state.movie.released_on,
        image_url: this.state.movie.image_url
      },
      review: {
        text: this.state.review,
        rating: 1.4,
        recommended: '0'
      }
    };

    superagent
      .post('/review')
      .set('Content-Type', 'application/json')
      .send(data)
      .then(result => {
        console.log(result.body);
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <Fragment>
        <div id="Review" className="component-container">
          <section className="movie-info">
            <h1>{this.state.movie.title}</h1>
            <p>{this.state.movie.synopsis}</p>
            <img
              src={this.state.movie.image_url}
              alt={this.state.movie.title}
            />
          </section>

          {/* TODO: Check if review already exists for this movie by the current user  */}

          <form onSubmit={this.handleSubmit} className="review-form">
            <h2>Review Notes</h2>
            <textarea
              rows="6"
              cols="50"
              value={this.state.review}
              onChange={this.handleChange}
            />
            <p>SLIDER GOES HERE</p>
            <button type="submit">Save your review</button>
          </form>
        </div>
      </Fragment>
    );
  }
}
