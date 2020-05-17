import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./components/Card";
import { getAllProducts } from "../admin/helper/adminapicall";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const preloadProducts = () => {
    getAllProducts().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preloadProducts();
  }, []);

  return (
    <Base
      title="Home"
      description="Welcome, Happy Shopping!"
      className="container"
    >
      <div className="row">
        {products.map((product, index) => {
          return (
            <div className="col-sm-12 col-md-4 col-lg-3">
              <Card key={index} product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
