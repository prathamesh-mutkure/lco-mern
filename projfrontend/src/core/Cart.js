import React, { useState, useEffect } from "react";
import Base from "./Base";
import CartCard from "./components/CartCard";
import { getAllCartItems } from "./helper/CartHelper";
import { getOrderTotal } from "./helper/OrderHelper";
import StripeCheckoutComponent from "./StripeCheckoutComponent";
import BraintreeCheckout from "./BraintreeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(true);

  const loadAllCartProducts = () => {
    setProducts(getAllCartItems());
  };

  const reloadPage = () => {
    setReload(!reload);
  };

  const displayProducts = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-md-push-6">
          <div className="card text-white bg-dark border-success p-3">
            <h3 className="text-white">
              Total amount is ${products && getOrderTotal(products)}
            </h3>
            <StripeCheckoutComponent products={products} />
            <BraintreeCheckout products={products} reload={reloadPage} />
          </div>
        </div>
        <div className="col-md-6">
          {products.map((product, index) => {
            return (
              <CartCard key={index} product={product} reload={reloadPage} />
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    loadAllCartProducts();
  }, [reload]);

  return (
    <Base
      title="Cart"
      description="Product checkout section"
      className="container"
    >
      {products.length > 0 ? (
        displayProducts()
      ) : (
        <div className="text-center">
          <h3 className="text-white font-weight-lighter text-muted">
            Cart Empty
          </h3>
        </div>
      )}
    </Base>
  );
};

export default Cart;
