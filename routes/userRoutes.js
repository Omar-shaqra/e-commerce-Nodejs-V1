const express = require("express");
const {
  getuserValidator,
  createuserValidator,
  updateuserValidator,
  ChangeUserPasswordValidator,
} = require("../utils/validator/uservalidation");

const userclass = require("../controllers/userservices");
const userobject = new userclass();

const router = express.Router();

router
  .route("/")
  .get(userobject.getUsers)
  .post(createuserValidator, userobject.createUser);
router
  .route("/:id")
  .get(userobject.getoneUser)
  .put(updateuserValidator, userobject.updateUser)
  .delete(userobject.deleteUser);
router
  .route("/changepassword/:id")
  .put(ChangeUserPasswordValidator, userobject.updateUserPassword);

module.exports = router;
