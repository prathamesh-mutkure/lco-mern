const express = require("express");

const router = express.Router();

const { getUserByID } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/braintree");

router.param("userId", getUserByID);

router.get(
  "/payment/braintree/gettoken/:userId",
  isSignedIn,
  isAuthenticated,
  getToken
);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
