const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const products = require("./data/products");
// const bodyParser = require('body-parser')
const app = express();
dotenv.config();

const connectDB = require("./config/db");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/user.route");
const router = require("./routes/uploadRoute");
const orderRouter = require("./routes/order.route");
const categoryGroupRouter = require("./routes/categoryGroup.route");
const categoryRouter = require("./routes/category.route");
const tableRouter = require("./routes/table.route");
// const errorHandler = require("./middleware/error");

connectDB();

const Port = process.env.PORT || 5001;

app.listen(Port, console.log(`Server is running on port ${Port}`));

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.use(bodyParser.json({}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/product", productRouter);
app.use("/api/users", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", router);
app.use("/api/category-group", categoryGroupRouter);
app.use("/api/category", categoryRouter);
app.use("/api/table", tableRouter);
// app.use(errorHandler)

// const __dirname = path.resolve()
const folder = path.resolve();
app.use("/uploads", express.static(path.join(folder, "/uploads")));
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(folder, "/client/build/")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(folder, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Hello server is running");
  });
}

// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404)
//   next(error)
// });

app.use("/hello", (req, res) => {
  return res.send("Hello your server is running");
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 404 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});
