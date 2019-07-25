import React, { Fragment, Component } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Fragment>
      <nav className="navbar">
        <Link to="/">
          <div id="title-logo"></div>
        </Link>

        <ul id="navbar-links">
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/about-us">
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </Fragment>
  );
}
