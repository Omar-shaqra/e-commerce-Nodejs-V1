const express = require("express");

const subcatigoriesClass = require("../controllers/subcategoryservices");
const subcatigoriesObj = new subcatigoriesClass();

//mergeparams : allow us to access the parameters on other routes
const router = express.Router({ mergeParams: true });

const {
  createsubcategory,
  getonesubcategory,
  updateonesubcategory,
  deleteonesubcategory,
} = require("../utils/validator/subcategoryvalidation");

//router.get('/',catigoriesObj.createCategory);
router
  .route("/")
  .post(
    subcatigoriesObj.setcategoryidtobody,
    createsubcategory,
    subcatigoriesObj.createsubCategory
  )
  .get(subcatigoriesObj.filterobject, subcatigoriesObj.getsubCategories);
router
  .route("/:id")
  .get(getonesubcategory, subcatigoriesObj.getonesubcategory)
  .put(updateonesubcategory, subcatigoriesObj.updatesubcategory)
  .delete(deleteonesubcategory, subcatigoriesObj.deletesubcategory);
module.exports = router;
