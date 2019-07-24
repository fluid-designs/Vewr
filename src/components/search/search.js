import React, { Fragment, Component } from "react";
import {Link} from "react-router-dom";
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
        data: this.state.query, 
        url: 'movies'
      })
      .then(result => {
        //console.log(result.body);
         this.setState({
          movies: result.body
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
              return <li key={movie.movie_id}>
              <img src={movie.image_url} />
              <Link to={`/review/${movie.movie_id}`}>
                <h3>{movie.title}</h3>
              </Link>
              <p className="synopsis">{movie.synopsis}</p>
              </li>
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

