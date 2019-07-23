import React, { Fragment, Component } from "react";

let userName = "Brutus";


export default class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      query: ''
    };
  }

  // component is ready for data
  // first function that is called
  // will get data and then will render
  componentDidMount(){
    this.getUserId();
  }

  getUserId = () =>{
    if(localStorage.getItem('userId')){
      //TODO will get user info to display
      this.setState({
        userId: JSON.parse(localStorage.getItem('userId'))
      });
    } else {
      this.props.history.push('/')
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Query: ", this.state.query);
    this.props.history.push(`/search/${this.state.query}`);
  }

  render(){
    return (
      <Fragment>
        <div id="Dashboard" className="component-container">
        <h2>{`Welcome, ${this.state.userId}!!`}</h2>
  
        <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="query"
          value={this.state.query}
          placeholder="Search for a movie"
          onChange={this.handleChange}
          required
        />
        <button type="submit">Search</button>

          <i className="fas fa-search fa-2x" />
        </form>
        </div>
      </Fragment>
    );
  }
}

