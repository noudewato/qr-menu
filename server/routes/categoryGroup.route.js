const express = require("express");
const {
  createCategoryGroup,
  getAllCategoryGroup,
  deleteCategoryGroup,
    updateCategoryGroup,
getCategoryGroupById
} = require("../controllers/categoryGroup.controller");
const categoryGroupRouter = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

categoryGroupRouter
  .route("/")
  .post(protect, admin, createCategoryGroup)
  .get(getAllCategoryGroup);
categoryGroupRouter
  .route("/:id")
  .get(getCategoryGroupById)
  .put(protect, admin, updateCategoryGroup)
  .delete(protect, admin, deleteCategoryGroup);

module.exports = categoryGroupRouter;
