import React, { Fragment, Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  saveUserId = (id) => {
    localStorage.setItem('userId', JSON.stringify(id))
    // TODO save the ID from the backend to LS
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username: ", this.state.username);
    this.saveUserId(1);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <Fragment>
        <div id="login" className="component-container">
          <h1>Login</h1>

          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter your username"
                onChange={this.handleChange}
                required
              />
            </div>
            
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
