const express = require("express");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/category.controller");
const categoryRouter = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

categoryRouter
  .route("/")
  .post(protect, admin, createCategory)
  .get(getAllCategory);
categoryRouter
  .route("/:id")
    .get(getCategoryById)
    .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = categoryRouter;
