const mongoose = require("mongoose");

const brandschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "brand name is too short"],
      maxlength: [32, "brand name is too long"],
    },
    //A and B => shopping.com/A and B
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },

  { timestamps: true }
);

const brandModel = mongoose.model("brand", brandschema);

module.exports = brandModel;
