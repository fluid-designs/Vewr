import React, { Fragment, Component } from "react";

export default function Review() {
  return (
    <Fragment>
      <div id="Review" className="component-container">
      <section className="movie-info">
        <h1>Movie name</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <img src="https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-m8zzyx_5670999f.jpeg?region=0%2C0%2C300%2C450" alt="Toy Story"></img>
      </section>
      <section className="review-form">
        <h2>Review Notes</h2>
        <textarea rows="6" cols="50"></textarea>
        <p>SLIDER GOES HERE</p>
        <button>Save your review</button>
      </section>
      <section className="saved-review">
        <h2>Review Notes</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <h2>Your Rating</h2>
        <p>7/10</p>
      </section>
      </div>
    </Fragment>
  );
}
