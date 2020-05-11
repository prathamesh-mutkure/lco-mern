import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { isAuthenticated, signout, isUser, isAdmin } from "../../auth/helper";

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
          <NavLink
            exact
            className="nav-link"
            activeClassName="active-nav-link"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active-nav-link"
            to="/cart"
          >
            Cart
          </NavLink>
        </li>

        {isUser() && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active-nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {isAdmin() && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active-nav-link"
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
    </div>

    {isAuthenticated() ? (
      <button
        className="btn btn-success nav-btn"
        onClick={() => {
          signout(() => history.push("/"));
        }}
      >
        Sign Out
      </button>
    ) : (
      <div>
        <button
          className="btn btn-success nav-btn"
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </button>
        <button
          className="btn btn-success nav-btn"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </button>
      </div>
    )}
  </nav>
);

export default withRouter(Menu);
