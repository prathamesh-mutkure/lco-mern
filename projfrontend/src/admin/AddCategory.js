import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { token, user } = isAuthenticated();

  const handleChange = (event) => {
    setCategoryName(event.target.value);
    setError(false);
    setSuccess(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    createCategory(user._id, token, { name: categoryName })
      .then((data) => {
        if (data.err) {
          setError(data.err);
        } else {
          setCategoryName("");
          setError(false);
          setSuccess(true);
        }
      })
      .catch((err) => {
        setError("Request Failed!");
        setSuccess(false);
        console.log(err);
      });
  };

  const categoryForm = () => {
    return (
      <div className="row">
        <form className="col col-lg-6 col-md-8 col-sm-12">
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              name="categoryName"
              value={categoryName}
              onChange={handleChange}
              id="categoryName"
              placeholder="Ex. Winter"
              required
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-success mt-2"
              onClick={onSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-dark">{error}</div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-success">Success</div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Create Category"
      description="Add a new category for products"
      className="container"
    >
      {error && errorMessage()}
      {success && successMessage()}
      {categoryForm()}
    </Base>
  );
};

export default AddCategory;
