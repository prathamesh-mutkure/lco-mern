import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    err: "",
    createdProduct: "",
    getRedirect: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    category,
    categories,
    loading,
    err,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onClick = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            categories: [],
            category: "",
            createdProduct: data.name,
            loading: false,
            err: false,
          });
          setTimeout(() => {
            setValues({ ...values, getRedirect: true });
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const photoForm = () => {
    return (
      <div className="row mb-3">
        <form className="col col-lg-6 col-md-8 col-sm-12 was-validated">
          <div className="custom-file">
            <input
              className="custom-file-input"
              type="file"
              accept="image/*"
              name="photo"
              id="photo"
              onChange={handleChange("photo")}
            />
            <label className="custom-file-label" for="photo">
              {photo.name || "Photo"}
            </label>
            <div className="invalid-feedback">
              Example invalid custom file feedback
            </div>
          </div>
        </form>
      </div>
    );
  };

  const createProductForm = () => {
    return (
      <div className="row">
        <form className="col col-lg-6 col-md-8 col-sm-12">
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange("name")}
              id="name"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Description
            </label>
            <textarea
              type="text"
              rows="3"
              className="form-control"
              name="description"
              value={description}
              onChange={handleChange("description")}
              id="description"
              placeholder="Description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Price
            </label>
            <input
              className="form-control"
              name="price"
              value={price}
              onChange={handleChange("price")}
              id="price"
              placeholder="Price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="text-light">
              Category
            </label>
            <select
              className="form-control custom-select"
              name="category"
              value={category}
              onChange={handleChange("category")}
              id="category"
              required
            >
              <option defaultValue>Choose</option>

              {categories.map((category, index) => {
                return (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Quantity
            </label>
            <input
              className="form-control"
              name="stock"
              value={stock}
              onChange={handleChange("stock")}
              id="stock"
              placeholder="Quantity"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-block"
            onClick={onClick}
          >
            Submit
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
          <div className="alert alert-success">Success</div>
        </div>
      </div>
    );
  };

  const loadingSpinner = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <Spinner animation="border" variant="light" />
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Add Product"
      description="Welcome to product creation section!"
      className="container"
    >
      {loading && loadingSpinner()}
      {createdProduct && successMessage()}
      {err && errorMessage()}
      {photoForm()}
      {createProductForm()}
      {getRedirect && <Redirect to="/admin/dashboard" />}
    </Base>
  );
};

export default AddProduct;
