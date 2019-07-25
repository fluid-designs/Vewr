import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      menuOpen: false
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This is being used to close the menu when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  displayNavLinks = props => {
    if (localStorage.getItem('userId') || this.state.auth) {
      return (
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width={'200px'}
          {...props}
        >
          <ul id="navbar-links">
            <Link onClick={() => this.closeMenu()} to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link onClick={() => this.closeMenu()} to="/about-us">
              <li>About</li>
            </Link>
            <Link onClick={() => this.closeMenu()} to="/">
              <li onClick={this.props.handleLogout}>Logout</li>
            </Link>
          </ul>
        </Menu>
      );
    } else {
      return (
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width={'200px'}
          {...props}
        >
          <ul id="navbar-links">
            <Link onClick={() => this.closeMenu()} to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link onClick={() => this.closeMenu()} to="/about-us">
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
