import React, { Fragment, Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log("Username: ", this.state.username);

    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <Fragment>
        <div className="login">
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
