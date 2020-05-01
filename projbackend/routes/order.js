const express = require("express");

const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID, pushOrderInPurchaseList } = require("../controllers/user");
const { updateInventory } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");

router.param("userId", getUserByID);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateInventory,
  createOrder
);

router.get(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
