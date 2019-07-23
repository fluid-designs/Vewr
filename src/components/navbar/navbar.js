import React, { Fragment, Component } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Fragment>
      <nav className="Navbar">
        <Link to="/">
          <h1>VEWR</h1>
        </Link>

        <ul>
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/search">
            <li>Search</li>
          </Link>
          <Link to="/review">
            <li>Review</li>
          </Link>
          <Link to="/about-us">
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </Fragment>
  );
}
