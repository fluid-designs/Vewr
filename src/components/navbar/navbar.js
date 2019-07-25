import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth
    };
  }

  displayNavLinks = props => {
    if (localStorage.getItem('userId') || this.state.auth) {
      return (
        <Menu right {...props}>
          <ul id="navbar-links">
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
        </Menu>
      );
    } else {
      return (
        <Menu right {...props}>
          <ul id="navbar-links">
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/about-us">
              <li>About</li>
            </Link>
          </ul>
        </Menu>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <nav className="navbar">
          <Link to="/dashboard">
            <div id="title-logo" />
          </Link>

          {this.displayNavLinks()}
        </nav>
      </Fragment>
    );
  }
}
