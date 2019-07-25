import React, { Fragment, Component } from 'react';
import superagent from 'superagent';

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_id: this.props.match.params.movie_id,
      movie: {},
      review: '',
      rating: 1,
      recommended: '',
      active: {
        like: "",
        dislike: ""
      }
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
        //console.log(result.body);
        this.setState({
          movie: result.body
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChangeReview = event => {
    this.setState({
      review: event.target.value
    });
  };

  handleChangeRating = event => {
    this.setState({
      rating: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

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
        rating: this.state.rating,
        recommended: this.state.recommended
      }

    };
    console.log('data', data);
    superagent
      .post('/review')
      .set('Content-Type', 'application/json')
      .send(data)
      .then(result => {
        //console.log(result.body);
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.error(err);
      });
  };

  thumbsUp = () => {
    this.setState({
      recommended: 1,
      active: {
        like: "active",
        dislike: ""
      }
    });
  };

  thumbsDown = () => {
    this.setState({
      recommended: 0,
      active: {
        like: "",
        dislike: "active"
      }
    });
  };

  render() {
    return (
      
      <Fragment>
        <div id="Review" className="component-container">
          <section className="movie-info">
            <div className="movie-poster">
              <img
                src={this.state.movie.image_url}
                alt={this.state.movie.title} />
            </div>
            <div>
              <h1>{this.state.movie.title}</h1>
              <h4>{"Movie Synopsis: ".toUpperCase()}</h4>
              <p id="synopsis">{this.state.movie.synopsis}</p>
            </div>


          </section>

          <form onSubmit={this.handleSubmit} className="review-form">
            <h2>Write your review</h2>
            <textarea
              id="review-text-box"
              rows="6"
              cols="45"
              value={this.state.review}
              onChange={this.handleChangeReview}
              required
            />
            <div> Would you recommend this film to your friends? </div>
            <div className="thumbsUpOrDown">
              <div className="rating">
                {/* <!-- Thumbs up --> */}
                <div className="like grow">
                  <i onClick={this.thumbsUp} className={`fa fa-thumbs-up fa-3x like ${this.state.active.like}`} aria-hidden="true"></i>
                </div>
                {/* <!-- Thumbs down --> */}
                <div className="dislike grow">
                  <i onClick={this.thumbsDown} className={`fa fa-thumbs-down fa-3x like ${this.state.active.dislike}`} aria-hidden="true"></i>
                </div>
              </div>
            </div>

            <select
              value={this.state.rating}
              onChange={this.handleChangeRating}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select><br /><br />
            <button type="submit">Save your review</button>
          </form>
        </div>
      </Fragment>
    );
  }
}
