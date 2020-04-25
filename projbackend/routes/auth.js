const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const { signup, signin, signout, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Enter a valid email!"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password should be atleast 8 character long!"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter a valid email!"),
    check("password").isLength({ min: 1 }).withMessage("Password is requires!"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/protected", isSignedIn, (req, res) => {
  res.send(req.auth);
});

module.exports = router;
