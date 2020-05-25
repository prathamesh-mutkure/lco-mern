import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const loadAllCategories = () => {
    getAllCategories().then((data) => {
      if (data.err) {
        console.log(data.err);
      }
      setCategories(data);
    });
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  return (
    <Base
      title="Manage Categories"
      description="Welcomd to category management section"
      className="container"
    >
      {categories.map((category) => {
        return (
          <div
            key={category._id}
            className="card bg-dark text-white border-success mb-2 cat-card"
          >
            <div className="row align-items-center">
              <div className="col">
                <p>{category.name}</p>
              </div>
              <div className="col-auto">
                <Link to={`/admin/category/update/${category._id}`}>
                  <i className="fas fa-edit fas-125"></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </Base>
  );
};

export default ManageCategories;
