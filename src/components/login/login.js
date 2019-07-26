import React, { Fragment, Component } from 'react';
import superagent from 'superagent';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  saveUserId = user => {
    localStorage.setItem('userId', JSON.stringify(user[0].id));
    localStorage.setItem('userName', JSON.stringify(user[0].username));
    localStorage.setItem('newUser', JSON.stringify(user[1]));
    // TODO save the ID from the backend to LS
  };

  handleChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    //login routing to connect to backend
    superagent
      .get('/login')
      .query({
        data: this.state.username
      })
      .then(result => {
        this.saveUserId(result.body);

        this.props.handleLogin();
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Fragment>
        <div id="login" className="component-container">
          <h1>LOGIN</h1>

          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                id="username-entry"
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter your username"
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <button id="submit-button" type="submit">SUBMIT</button>
            </div>
          </form>
          <p>* If you don't have an account, no worries; upon logging in a new account will be created for you.</p>
        </div>
      </Fragment>
    );
  }
}
