const Category = require("../models/category.model");
const CategoryGroup = require("../models/categoryGroup.model");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const { name, categoryGroup, image } = req.body;

  if (!image) {
    throw new Error("image is required");
  }

  const newCategory = new Category(req.body);

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    res.status(400);
    throw new Error("name already exists");
  }

  const categoryGroupFound = await CategoryGroup.findOne({
    name: categoryGroup,
  });

  if (!categoryGroupFound) {
    res.status(400);
    throw new Error("categoryGroup not found create one");
  }

  const saveCategory = await newCategory.save();
  categoryGroupFound.categories.push(saveCategory);

  await categoryGroupFound.save();

  if (saveCategory) {
    res.status(201).json(saveCategory);
  } else {
    res.status(404);
    throw new Error("Could not save Category, Try again");
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  let category = Category.find({});

  if (req.query.categoryGroup) {
    category = category.find({
      categoryGroup: { $regex: req.query.categoryGroup, $options: "i" },
    });
  }
  const allCategory = await category
    .find()
    .sort({ name: "ascending" })
    .populate("user", "username");

  if (allCategory) {
    res.status(200).json(allCategory);
  } else {
    res.status(404);
    throw new Error("CategoriesGroup not found");
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate("products");

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, image, isActive, categoryGroup } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    (category.name = name),
      (category.categoryGroup = categoryGroup),
      (category.isActive = isActive),
      (category.image = image);

    await category.save();
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("Category update failed");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("delete failed");
  }
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
