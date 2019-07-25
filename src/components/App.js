import React, { Fragment, Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./navbar/navbar.js";
import Login from "./login/login.js";
import Dashboard from "./dashboard/dashboard.js";
import Search from "./search/search.js";
import Review from "./review/review.js";
import AboutUs from "./about-us/about-us.js";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false
    };
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({auth: false}); 
  }

  handleLogin = () => {
    this.setState({auth: true });
  }
  

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar auth={this.state.auth} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} handleLogin={this.handleLogin}/>} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/search/:query" component={Search} />
            <Route path="/review/:movie_id" component={Review} />
            <Route path="/about-us" component={AboutUs} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
