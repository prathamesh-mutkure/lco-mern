const User = require("../models/user");
const Order = require("../models/order");

const { handleError } = require("../utils/handleResponse");

exports.getUserByID = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err || !user) handleError(res, "User not found!", 400);
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // TODO: get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.__v = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.profile._id,
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) handleError(res, "Could not update user!", 400);
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      user.__v = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) return handleError(res, "Orders not found!", 400);
      return res.json(orders);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    const { _id, name, description, category, quantity } = product;
    purchases.push({
      _id,
      name,
      description,
      category,
      quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err) => {
      if (err) handleError(res, "Unable to save purchase list!", 400);
      next();
    }
  );
};
