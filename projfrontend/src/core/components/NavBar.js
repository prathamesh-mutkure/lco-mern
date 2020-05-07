import React from "react";
import { Link, withRouter } from "react-router-dom";

function isActive(history, path) {
  if (history.location.path === path) return "active";
  else return "";
}

const Menu = ({ history }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      LCO
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={"nav-link " + isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link " + isActive(history, "/cart")} to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={"nav-link " + isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={"nav-link " + isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={"nav-link " + isActive(history, "/signup")}
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={"nav-link " + isActive(history, "/signin")}
            to="/signin"
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={"nav-link " + isActive(history, "/signout")}
            to="/signout"
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);
