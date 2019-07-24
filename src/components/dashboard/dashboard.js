import React, { Fragment, Component } from 'react';
import { Tabs, TabList, Tab, PanelList, Panel } from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
import superagent from 'superagent';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      query: '',
      activeIndex: 0,
      suggested: [],
      reviewedMovies: []
    };
  }

  // first function that is called what page is loaded
  // will get data first and then render component
  // Gets suggestions data from server
  componentDidMount() {
    this.getUserId();
    superagent
      .get('/suggestions')
      .then(result => {
        this.setState({
          suggested: result.body
        });
      })
      .catch(error => {
        console.log(error);
      });

    superagent
      .get('/reviews')
      .query({
        data: JSON.parse(localStorage.getItem('userId'))
      })
      .then(result => {
        this.setState({
          reviews: result.body
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUserId = () => {
    if (localStorage.getItem('userId')) {
      //TODO will get user info to display
      this.setState({
        userId: JSON.parse(localStorage.getItem('userId'))
      });
    } else {
      this.props.history.push('/');
    }
  };

  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Query: ', this.state.query);
    this.props.history.push(`/search/${this.state.query}`);
  };

  handleTabChange = index => {
    this.setState({ activeIndex: index });
  };

  render() {
    return (
      <Fragment>
        <div id="dashboard" className="component-container">

        <img className="profile-pic" src={`https://avatars.dicebear.com/v2/bottts/${this.state.userId}.svg`} alt="Profile" />
          <h1>{`Welcome, ${this.state.userId}!!`}</h1>

          <div id="react-tab">
            <Tabs
              customStyle={customStyle}
              activeIndex={this.state.activeIndex}
              onTabChange={this.handleTabChange}
            >

            <TabList className="tab-list">
              <Tab><i className="far fa-thumbs-up"/> Suggestions</Tab>
              <Tab><i className="fas fa-film"/> Movies</Tab>
            </TabList>
            <PanelList className="panel-list">
              <Panel>
                <h2>Suggested Movies</h2>
              {/* TODO: Render list of suggested movies  */}
              {/* <ul className="movie-list">
            {this.state.movies.map(movie => {
              return <li key={movie.movie_id}>
              <div className="movie-poster"><Link to={`/review/${movie.movie_id}`}><img src={movie.image_url} /></Link></div>
              <div>
                <Link to={`/review/${movie.movie_id}`}>
                  <h3>{movie.title}</h3>
                </Link>
                <p className="synopsis">{movie.synopsis}</p>
              </div>
              </li>
            })}
          </ul> */}

              </Panel>
              <Panel>
              <h2>Reviewed Movies</h2>
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
