const express = require("express");

const productsClass = require("../controllers/productservices");
const productsObj = new productsClass();

//mergeparams : allow us to access the parameters on other routes
const router = express.Router({ mergeParams: true });

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validator/productvalidation");

//router.get('/',catigoriesObj.createCategory);
router
  .route("/")
  .post(createProductValidator, productsObj.createproduct)
  .get(productsObj.getproducts);
router
  .route("/:id")
  .get(getProductValidator, productsObj.getoneproduct)
  .put(updateProductValidator, productsObj.updateproduct)
  .delete(deleteProductValidator, productsObj.deleteproduct);

module.exports = router;
