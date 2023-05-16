const express = require("express");
const { check, validationResult } = require("express-validator");
const vmiddleware = require("../middlewares/validatormiddleware");

//const{ getCategory , createCategory,} = require("../controllers/categoryservices");
const catigoriesClass = require("../controllers/categoryservices");

const catigoriesObj = new catigoriesClass();

const router = express.Router();

const subcategoriesHandlerRoute = require("./subcategoryRoutes");
router.use("/:categoryid/subcategories", subcategoriesHandlerRoute);

//router.get('/',catigoriesObj.createCategory);
router
  .route("/")
  .get(catigoriesObj.getCategories)
  .post(
    check("name")
      .notEmpty()
      .withMessage("category name is required")
      .isLength({ min: 3 })
      .withMessage("category name is too short")
      .isLength({ max: 32 })
      .withMessage("category name is too long"),
    vmiddleware,
    catigoriesObj.createCategory
  );
router
  .route("/:id")
  .get(
    check("id").isMongoId().withMessage("invalid catigoryid"),
    vmiddleware,
    catigoriesObj.getonecategory
  )
  .put(
    check("id").isMongoId().withMessage("invalid catigoryid"),
    vmiddleware,
    catigoriesObj.updatecategory
  )
  .delete(
    check("id").isMongoId().withMessage("invalid catigoryid"),
    vmiddleware,
    catigoriesObj.deletecategory
  );

module.exports = router;
