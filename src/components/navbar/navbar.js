import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth
    };
  }

  displayNavLinks = () => {
    if (localStorage.getItem("userId") || this.state.auth) {
      return <ul id="navbar-links">
        <Link to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link to="/about-us">
          <li>About</li>
        </Link>
        <Link to="/">
          <li onClick={this.props.handleLogout}>Logout</li>
        </Link>
      </ul>
    } else {
      return <ul id="navbar-links">
        <Link to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link to="/about-us">
          <li>About</li>
        </Link>
      </ul>
    }
  }


  render() {
    return (
      <Fragment>
        <nav className="navbar">
          <Link to="/">
            <div id="title-logo"></div>
          </Link>
  
          {this.displayNavLinks()}
        </nav>
      </Fragment>
    );
  }
}
