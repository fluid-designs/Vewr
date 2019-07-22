import React, { Fragment, Component } from "react";

let userName = "Brutus";

export default function Dashboard() {
  return (
    <Fragment>
      <h2>{`Welcome, ${userName}!!`}</h2>

      <form>
        <input />
        <i className="fas fa-search fa-2x" />
      </form>
    </Fragment>
  );
}
