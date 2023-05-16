const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validator/authvalidator");
const { signup, login } = require("../controllers/authservices");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);

router.route("/login").post(loginValidator, login);

module.exports = router;
