const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

var bodyParser = require("body-parser");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const dbconnection = require("./config/database");
const categoryroute = require("./routes/categoryRoutes");
const subcategoryroute = require("./routes/subcategoryRoutes");
const brandroute = require("./routes/brandRoutes");
const productroute = require("./routes/productRoutes");
const userroute = require("./routes/userRoutes");
const authroute = require("./routes/authRoutes");

const app = express();

//middle ware
app.use(morgan("dev"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.port;

dbconnection(); //mongoose connection

//root
app.use("/api/v1/categories", categoryroute);
app.use("/api/v1/subcategories", subcategoryroute);
app.use("/api/v1/brands", brandroute);
app.use("/api/v1/products", productroute);
app.use("/api/v1/users", userroute);
app.use("/api/v1/auth", authroute);

//handlling errors

app.all("*", (req, res, next) => {
  /*   const err = new Error(`can't find this route ${req.originalUrl}`);
    next(err.message);*/
  const msg = `can't find this route ${req.originalUrl}`;
  next(new ApiError(msg, 400));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

const server = app.listen(port, () => {
  console.log(`server start on ${port}`);
});

// handling regiction outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error : ${err.name} | ${err.message} `);
  server.close(() => {
    console.error("Shutting down.....");
    process.exit(1);
  });
});
