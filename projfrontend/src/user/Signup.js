import React from "react";
import Base from "../core/Base";

const Signup = () => {
  const signupForm = () => (
    <div className="row">
      <form className="col-lg-6 col-md-8 col-sm-12 align-self-center">
        <div className="form-row">
          <div className="form-group col-6">
            <label htmlFor="name" className="text-light">
              First Name
            </label>
            <input type="text" className="form-control" name="name" id="name" />
          </div>
          <div className="form-group col-6">
            <label htmlFor="lname" className="text-light">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lname"
              id="lname"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-light">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-light">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-block btn-outline-success">
          Sign Up
        </button>
      </form>
    </div>
  );

  return (
    <Base title="Signup" description="Signup to explore!" className="container">
      {signupForm()}
    </Base>
  );
};

export default Signup;
