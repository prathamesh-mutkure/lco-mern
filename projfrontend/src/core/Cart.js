import React, { useState, useEffect } from "react";
import Base from "./Base";
import CartCard from "./components/CartCard";
import { getAllCartItems } from "./helper/CartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const loadAllCartProducts = () => {
    setProducts(getAllCartItems());
  };

  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    loadAllCartProducts();
  }, []);

  return (
    <Base
      title="Cart"
      description="Your products are ready for checkout"
      className="container"
    >
      {products.map((product, index) => {
        return <CartCard key={index} product={product} reload={reload} />;
      })}
    </Base>
  );
};

export default Cart;
