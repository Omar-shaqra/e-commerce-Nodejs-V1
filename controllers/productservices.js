const slugify = require("slugify");
const Productmodel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

class products {
  // @desc  get list catigory
  // @route get /api/v1/categories
  //@ access public
  getproducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    // const stringqueryobject = { ...req.query };
    // const excludsFields = ["page", "limit", "sort", "fields"];

    // excludsFields.forEach((el) => delete stringqueryobject[el]);

    // let querystr = {};

    // if (req.query.keyword) {
    //   //serch
    //   querystr.$or = [
    //     { title: { $regex: req.query.keyword, $options: "i" } },
    //     { description: { $regex: req.query.keyword, $options: "i" } },
    //   ];
    // } else {
    //   //filter
    //   querystr = JSON.stringify(stringqueryobject);
    //   querystr = querystr.replace(
    //     /\b(gte|gt|lte|lt)\b/g,
    //     (match) => `$${match}`
    //   );
    //   querystr = JSON.parse(querystr);
    // }
    //// sort
    // let sortby = "-createdAt";
    // if (req.query.sort) {
    //   sortby = req.query.sort.split(",").join(" ");
    // }

    // //select fields
    // let fields = "-__v";
    // if (req.query.fields) {
    //   fields = req.query.fields.split(",").join(" ");
    // }

    //build query
    let query = {};
    if (req.query.keyword) {
      query.$or = [
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ];
      console.log(query);
      const test = await Productmodel.find(query);
      console.log(test);
    }

    const DocumentsCounts = await Productmodel.countDocuments();

    const apiFeatures = new ApiFeatures(Productmodel.find(), req.query)
      .paginate(DocumentsCounts)
      .search()
      .filter()

      .limitFields()
      .sort();

    const { mongooseQuery, PaginationResult } = apiFeatures;

    const products = await mongooseQuery;

    res
      .status(200)
      .json({ results: products.length, PaginationResult, data: products });

    // const getproduct = await productmodel
    //   .find(querystr)
    //   .skip(skip)
    //   .limit(limit)
    //   .sort(sortby)
    //   .select(fields);
    // res
    //   .status(200)
    //   .json({ results: getproduct.length, page, data: getproduct });
  });

  getoneproduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const getproduct = await productmodel.findById(id);
    if (!getproduct) {
      //    res.status(404).json({msg : "error : id is not found"});
      return next(new ApiError("error : id is not found", 404));
    }
    res.status(200).json({ result: getproduct });
  });

  // @desc  create catigory
  // @route post /api/v1/categories
  //@ access private
  createproduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const product = await productmodel.create(req.body);
    res.status(201).json({ data: product });
  });

  updateproduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedata = await productmodel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!updatedata) {
      //  res.status(404).json({msg : "error : id is not found"});
      return next(new ApiError("error : id is not found", 404));
    }
    res.status(200).json({ result: updatedata });
  });

  deleteproduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletecategory = await productmodel.findByIdAndDelete(id);
    if (!deletecategory) {
      //   res.status(404).json({msg : "error : id is not found"});
      return next(new ApiError("error : id is not found", 404));
    }
    res.status(204).send();
  });
}

module.exports = products;
