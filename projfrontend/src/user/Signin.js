import React from "react";
import { useState } from "react";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    err: "",
    didRedirect: false,
    loading: false,
  });

  const { email, password, err, didRedirect, loading } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: false });
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err, loading: false });
        } else {
          authenticate(data, () => {
            // setValues({ ...values, loading: true, didRedirect: true });
            setValues({
              email: "",
              password: "",
              err: "",
              didRedirect: true,
              loading: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed!"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to Admin</p>;
      } else {
        return <p>Redirect to User</p>;
      }
    }

    // TODO: Add redirect routes
    // if (isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
  };

  const signinForm = () => {
    return (
      <div className="row">
        <form className="col-lg-6 col-md-8 col-sm-12">
          <div className="form-group">
            <label htmlFor="email" className="text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={handleChange("email")}
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
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-block btn-outline-success"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-dark">{err}</div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-success">Signin success</div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Signin"
      description="Signin to start shopping!"
      className="container"
    >
      {err && errorMessage()}
      {loading && successMessage()}
      {signinForm()}
      {loading && performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
