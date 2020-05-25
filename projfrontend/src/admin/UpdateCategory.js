import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategoryById, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Spinner } from "react-bootstrap";

const UpdateCategory = ({ match }) => {
  const categoryId = match.params.categoryId;
  const { token, user } = isAuthenticated();

  const [values, setValues] = useState({
    categoryName: "",
    err: "",
    success: false,
    loading: false,
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const { categoryName, loading, err, success } = values;

  const onChange = (event) => {
    setValues({
      ...values,
      err: "",
      categoryName: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      loading: true,
    });

    updateCategory(categoryId, user._id, token, { name: categoryName }).then(
      (data) => {
        if (data.err) {
          setValues({
            ...values,
            loading: false,
            err: data.err,
          });
        } else {
          setValues({
            ...values,
            loading: false,
            success: true,
          });
        }
      }
    );
  };

  const loadCategory = () => {
    getCategoryById(categoryId).then((data) => {
      setValues({
        ...values,
        categoryName: data.name,
      });
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
              onChange={onChange}
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
          <div className="alert alert-dark">{err}</div>
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

  const loadingSpinner = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <Spinner animation="border" variant="success" />
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Update Category"
      description="Category updation center"
      className="container"
    >
      {err && errorMessage()}
      {success && successMessage()}
      {loading && loadingSpinner()}
      {categoryForm()}
    </Base>
  );
};

export default UpdateCategory;
