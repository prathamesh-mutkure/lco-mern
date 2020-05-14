import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onClick = (productId) => () => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          preload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base
      title="Manage Products"
      description="Welcome to product management section"
      className="container"
    >
      <table className="table table-dark table-borderless table-hover">
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <th scope="row" className="text-125">
                  {product.name}
                </th>
                <td className="text-center">
                  <Link to={`/admin/product/update/${product._id}`}>
                    <i className="fas fa-edit fas-125"></i>
                  </Link>
                </td>
                <td className="text-center">
                  <i
                    className="fas fa-trash fas-125"
                    onClick={onClick(product._id)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Base>
  );
};

export default ManageProducts;
