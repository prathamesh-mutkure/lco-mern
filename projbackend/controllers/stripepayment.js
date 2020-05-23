const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const { handleError } = require("../utils/handleResponse");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  const idempotencyKey = uuidv4();

  let totalAmount = 0;
  products.map((product) => {
    totalAmount = totalAmount + product.price * product.count;
  });

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: totalAmount * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: "Test",
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => handleError(res, "Error making payment!", 500));
};
