import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab, PanelList, Panel } from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
import superagent from 'superagent';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      userName: '',
      newUser: '',
      query: '',
      activeIndex: 0,
      suggested: [],
      reviewedMovies: [],
      delete: false,
      promiseIsResolved: false
    };
  }

  // first function that is called what page is loaded
  // will get data first and then render component
  // Gets suggestions data from server
  async componentDidMount() {
    if (localStorage.getItem('userId')) {
      
      const userId = JSON.parse(localStorage.getItem('userId'));
      try {
        const suggestions = await superagent.get('/suggestions');
        const reviews = await superagent
          .get('/reviews')
          .query({ data: userId });

        let index;
        if (this.props.match.params.tab) {
          index = parseInt(this.props.match.params.tab);
        } else {
          index = 0;
        }

        this.setState({
          reviewedMovies: reviews.body,
          suggested: suggestions.body,
          userId: JSON.parse(localStorage.getItem('userId')),
          userName: JSON.parse(localStorage.getItem('userName')),
          newUser: JSON.parse(localStorage.getItem('newUser')),
          activeIndex: index,
          promiseIsResolved: true
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      this.props.history.push('/');
    }
  }

  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
  };

  handleTabChange = index => {
    this.setState({ activeIndex: index });
  };

  handleRecommended = review => {
    return parseInt(review.recommended) === 1 ? (
      <i className="far fa-thumbs-up" />
    ) : (
        <i className="fas fa-thumbs-down" />
      );
  };

  handleTweet = (event, movieReview) => {
    event.preventDefault();
    let tweetBody =
      `Created On:${movieReview.created_on}
    Movie Title: ${movieReview.title}
    Rating:${movieReview.rating}
    Recommended:${movieReview.recommended}
    Review:${movieReview.review}`;

    superagent.post("/tweet")
      .set('Content-Type', 'application/json')
      .send({ review: tweetBody })
      .then(res => {
        if (!res.body.err) {
          toast('Tweet has been sent!', { autoClose: 2000, position: "top-center" });
          return;
        } else {
          toast(`Tweet has already been sent.`, { autoClose: 2000, position: "top-center" });
          return;
        }
        
      })
      .catch(err => {
        console.error('ERR: ', err);
      });
  };

  handleDelete = (event, movieId) => {
    event.preventDefault();
    const userId = JSON.parse(localStorage.getItem('userId'));

    toast('Movie review has been deleted!', { autoClose: 2000, position: "top-center" });

    superagent
      .delete('/review')
      .query({ userId, movieId})
      .then(res => {
        this.setState({ 
          reviewedMovies: res.body
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
        return (
          <div id="dashboard" className="component-container">
            <ToastContainer />         
            <img
              className="profile-pic"
              src={`https://avatars.dicebear.com/v2/bottts/${
                this.state.userId
              }.svg`}
              alt="Profile"
            />
            <h1>{`Welcome, ${this.state.userName}!!`}</h1>

            <div id="react-tab">
              <Tabs
                customStyle={customStyle}
                activeIndex={this.state.activeIndex}
                onTabChange={this.handleTabChange}
              >
                <TabList className="tab-list">
                  <Tab>
                    <i className="far fa-thumbs-up" /> Suggestions
                  </Tab>
                  <Tab>
                    <i className="fas fa-film" /> Reviews
                  </Tab>
                </TabList>
                <PanelList className="panel-list">
                  <Panel>
                    <h1>Suggested Movies</h1>
                    <h2>List of popular movies for you to review.</h2>
                    <ul className="suggested-list">
                      {this.state.suggested.map(movie => {
                        return (
                          <li key={movie.movie_id}>
                            <div className="movie-poster">
                              <Link to={`/review/${movie.movie_id}`}>
                                <img src={movie.image_url} alt={movie.title} />
                              </Link>
                            </div>
                            <div>
                              <Link to={`/review/${movie.movie_id}`}>
                                <h3>{movie.title}</h3>
                              </Link>
                              <p className="synopsis">{movie.synopsis}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </Panel>
                  <Panel>
                    <h1>Reviewed Movies</h1>
                    <h2>List of all the movies you have reviewed.</h2>
                    <ul className="movie-list">
                      {this.state.reviewedMovies.map(review => {
                        return (
                          <li key={review.id}>
                            <div className="review-poster">
                              <Link to={`/review/${review.movie_id}`}>
                                <img
                                  src={review.image_url}
                                  alt={review.title}
                                />
                              </Link>
                            </div>
                            <div className="review-details">
                              <Link to={`/review/${review.movie_id}`}>
                                <h3>{review.title.toUpperCase()}</h3>
                              </Link>
                              <p>Review: {review.review}</p>
                              <p>Rating: {review.rating}</p>
                              <p>Recommend: {this.handleRecommended(review)}</p>
                              <span>
                                Created: {review.created_on}{' '}
                                <i
                                  onClick={event =>
                                    this.handleTweet(event, review)
                                  }
                                  className="fab fa-twitter"
                                />
                              </span>
                            </div>
                            <div>
                            <i onClick={(event) => this.handleDelete(event, review.id)} className="far fa-trash-alt"></i>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </Panel>
                </PanelList>
              </Tabs>
            </div>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="query"
              value={this.state.query}
              placeholder="Search for a movie"
              onChange={this.handleChange}
              required
            />
            <button type="submit">
              <i className="fas fa-search" />
            </button>
          </form>
        </div>)
      }
    };

    return <Fragment>{waitForAsync()}</Fragment>;
  }
}
