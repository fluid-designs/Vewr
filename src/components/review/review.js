import React, { Fragment, Component } from "react";
import superagent from "superagent";

export default class Review extends Component{
  constructor(props) {
    super(props);
    this.state = {
      movie_id: this.props.match.params.movie_id,
      movie: {},
      review:''
    };
  }

  componentDidMount(){
    // Make a http get request using superagent
    // Save response into state as movie object

    superagent
      .get('/search')
      .query({
        data: this.state.movie_id, 
        url: 'search'
      })
      .then(result =>{
        console.log(result.body)
        this.setState({
          movie: result.body
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange = (event) => {
    this.setState({
      review: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Review: ", this.state.review);
    // TODO Send post request to server which will save review into DB
    // Send an object which includes the user id, review, movie id, rating & recommend
    // Send movie details data movie_id, title, overview, released_on, image_url 
    //this.props.history.push("/dashboard");
  }

  render(){
    return (
      <Fragment>
        <div id="Review" className="component-container">
        <section className="movie-info">
          <h1>{this.state.movie.title}</h1>
          <p>{this.state.movie.overview}</p>
          <img src={this.state.movie.poster_path} alt={this.state.movie.title}></img>
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
