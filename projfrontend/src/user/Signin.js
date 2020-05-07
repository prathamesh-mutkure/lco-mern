import React from "react";
import Base from "../core/Base";

const Signin = () => {
  const signinForm = () => (
    <div className="row">
        <form className="col-lg-6 col-md-8 col-sm-12 align-self-center">
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
            Sign In
          </button>
        </form>
      </div>
  );

  return (
    <Base
      title="Signin"
      description="Signin to start shopping!"
      className="container"
    >
      {signinForm()}
    </Base>
  );
};

export default Signin;
