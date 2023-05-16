const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");

exports.signup = asyncHandler(async (req, res, next) => {
  if (req.body.password == req.body.passwordConfirm) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  } else {
    throw new ApiError("Invalid password confirmation");
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRETIME,
  });

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("incorrect password or email", 401));
  }
  const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRETIME,
  });
  res.status(200).json({ data: user, token });
});
