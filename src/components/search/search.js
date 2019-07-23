import React, { Fragment, Component } from "react";
import superagent from "superagent";

require('dotenv').config()

export default class Search extends Component{
  constructor(props) {
    super(props);
    //console.log(this.props.match.params.query)
    this.state = {
      query: this.props.match.params.query,
      movies: []
    };
  }

  componentDidMount(){
    // make request off of query parameter being passed from dashboard.js
    
    superagent
      .get('/movies')
      .query({
        data: this.state.query
      })
      .then(result => {
        console.log('search ', result.body.results);
        this.setState({
          movies: result.body.results
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render(){
    return (
      <Fragment>
        <div id="Search" className="component-container">
          <h1>Search results</h1>
          <ul>
            {this.state.movies.map(movie => {
              return <li key={movie.title}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              </li>
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

