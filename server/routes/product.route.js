const express = require("express");
const productRouter = express.Router();

const {
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
  createProduct
} = require("../controllers/product.controller");
const { protect, admin } = require("../middleware/authMiddleware");

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);

productRouter
  .route("/:id")
  .get(protect, admin, getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
module.exports = productRouter;
