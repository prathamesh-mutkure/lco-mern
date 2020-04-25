const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
var cookieParser = require("cookie-parser");

const User = require("../models/user");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.errors.map((error) => {
        return {
          msg: error.msg,
          param: error.param,
        };
      }),
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        msg: "Could not save user to DB",
        err: err,
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.json(errors);
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Database error, please try again!",
      });
    }

    if (!user) {
      return res.status(400).json({
        err: "User does not exist!",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Incorrect username or password!",
      });
    }

    const { _id, name, email, role } = user;

    // Create a token
    const token = jwt.sign({ _id: _id }, process.env.SECRET);
    // Store the token in a cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signed out!!",
  });
};

// Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Custom middleware
exports.isAuthenticated = (req, res, next) => {
  const check = req.profile && req.auth && req.profile._id === req.auth._id;

  if (!check) {
    res.status(403).json({
      err: "Access Denied!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      err: "Access Denied!",
    });
  }
  next();
};
