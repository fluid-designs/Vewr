import React, { Fragment, Component } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Fragment>
      <div className="Navbar">
        <Link to="/">
          <h3>VEWR</h3>
        </Link>

        <ul>
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/about-us">
            <li>About Us</li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}
