import React, { useState } from "react";
import { getOrderTotal } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckoutComponent = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    err: "",
    address: "",
  });

  const { token, user } = isAuthenticated();

  const makePayment = (token) => {
    const body = {
      token: token,
      products: products,
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        alert(response.status === 200 ? "Success" : "Error");
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        amount={getOrderTotal(products) * 100}
        name="Buy Products"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success btn-block mb-2 mt-2">
          Pay with Stripe
        </button>
      </StripeCheckout>
    ) : null;
  };

  return <div className="mb-2">{showStripeButton()}</div>;
};

export default StripeCheckoutComponent;
