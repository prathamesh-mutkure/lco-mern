import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card border-success">
        <div className="card-header bg-dark text-light">Admin Navigation</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="text-success">
              Create Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div>
        <h1>Hello {name}</h1>
        <div className="card border-success">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="badge badge-success">Name:</div> {name}
            </li>
            <li className="list-group-item">
              <div className="badge badge-success">Email:</div> {email}
            </li>
            <li className="list-group-item">
              <div className="badge badge-danger">Admin Access</div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
