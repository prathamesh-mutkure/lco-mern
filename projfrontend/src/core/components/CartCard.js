import React from "react";
import ImageHelper from "../helper/ImageHelper";
import { removeItemFromCart } from "../helper/CartHelper";

const CartCard = ({ product, reload }) => {
  return (
    <div className="card w-75 text-white bg-dark border-success mb-3">
      <div className="row">
        <div className="col-sm-1 col-md-4 col-lg-4">
          <ImageHelper productId={product._id} className="cart-img" />
        </div>
        <div className="col">
          <div className="cart-info">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text font-weight-light">{product.description}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeItemFromCart(product._id);
                reload();
              }}
            >
              Remove from Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// {/* <div className="card-body"> */}
// <div className="row">
// <div className="col-3">
//   <ImageHelper productId={product._id} />
// </div>
// <div className="col-9">
//   <div className="card-body">
//     <h5 className="cart-title">{product.name}</h5>
//     <p className="card-text font-weight-light">{product.description}</p>
//     <button className="btn btn-success">Remove from Cart</button>
//   </div>
// </div>
// </div>
// {/* </div> */}

export default CartCard;
