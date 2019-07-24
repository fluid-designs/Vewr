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
          <img
            className="profile-pic"
            src={`https://avatars.dicebear.com/v2/bottts/${
              this.state.userId
            }.svg`}
          />
          <h2>{`Welcome, ${this.state.userId}!!`}</h2>

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
                  <i className="fas fa-film" /> Movies
                </Tab>
              </TabList>
              <PanelList className="panel-list">
                <Panel>List of suggested movies</Panel>
                <Panel>Display movies that you have reviewed</Panel>
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
