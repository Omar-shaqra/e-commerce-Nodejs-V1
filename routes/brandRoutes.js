const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validator/brandvalidation");

const brandclass = require("../controllers/brandservices");
const brandobject = new brandclass();

const router = express.Router();

router
  .route("/")
  .get(brandobject.getBrands)
  .post(createBrandValidator, brandobject.createBrand);
router
  .route("/:id")
  .get(getBrandValidator, brandobject.getoneBrand)
  .put(updateBrandValidator, brandobject.updateBrand)
  .delete(deleteBrandValidator, brandobject.deleteBrand);

module.exports = router;
