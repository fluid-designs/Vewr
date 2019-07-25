import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab, PanelList, Panel } from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
import superagent from 'superagent';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      userName: '',
      query: '',
      activeIndex: 0,
      suggested: [],
      reviewedMovies: []
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

        this.setState({
          reviewedMovies: reviews.body,
          suggested: suggestions.body,
          userId: JSON.parse(localStorage.getItem('userId')),
          userName: JSON.parse(localStorage.getItem('userName'))
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
    //console.log(review);
    return parseInt(review.recommended) === 1 ? (
      <i className="far fa-thumbs-up" />
    ) : (
      <i className="fas fa-thumbs-down" />
    );
  };

  render() {
    return (
      <Fragment>
        <div id="dashboard" className="component-container">
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
                  <i className="fas fa-film" /> Reviewed Movies
                </Tab>
              </TabList>
              <PanelList className="panel-list">
                <Panel>
                  <h2>Suggested Movies</h2>
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
                  <h2>Reviewed Movies</h2>
                  <ul className="movie-list">
                    {this.state.reviewedMovies.map(review => {
                      return (
                        <li key={review.id}>
                          <div className="review-poster">
                            <Link to={`/review/${review.movie_id}`}>
                              <img src={review.image_url} alt={review.title} />
                            </Link>
                          </div>
                          <div>
                            <Link to={`/review/${review.movie_id}`}>
                              <h3>{review.title}</h3>
                            </Link>
                            <p>Review: {review.review}</p>
                            <p>Rating: {review.rating}</p>
                            <p>Recommend: {this.handleRecommended(review)}</p>
                            <p>Created: {Date(review.created_on)}</p>
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
        </div>
      </Fragment>
    );
  }
}
