const CategoryGroup = require("../models/categoryGroup.model");
const asyncHandler = require("express-async-handler");

const createCategoryGroup = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const { name } = req.body;

  const newCategoryGroup = new CategoryGroup(req.body);

  const existingCategoryGroup = await CategoryGroup.findOne({ name });

  if (existingCategoryGroup) {
    res.status(400);
    throw new Error("name already exists");
  }

  const saveCategoryGroup = await newCategoryGroup.save();

  if (saveCategoryGroup) {
    res.status(201).json(saveCategoryGroup);
  } else {
    res.status(404);
    throw new Error("Could not save Product, Try again");
  }
});

const getAllCategoryGroup = asyncHandler(async (req, res) => {
  let categoryGroup = CategoryGroup.find();

  if (req.query.name) {
    categoryGroup = categoryGroup.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  const allCategoryGroup = await categoryGroup
    .find()
    .sort({ createdAt: 1 })
    .populate("user", "username")
    .populate("categories");

  if (allCategoryGroup) {
    res.status(200).json(allCategoryGroup);
  } else {
    res.status(404);
    throw new Error("CategoriesGroup not found");
  }
});

const getCategoryGroupById = asyncHandler(async (req, res) => {
  const categoryGroup = await CategoryGroup.findById(req.params.id).populate(
    "categories"
  );

  if (categoryGroup) {
    res.status(200).json(categoryGroup);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const updateCategoryGroup = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categoryGroup = await CategoryGroup.findById(req.params.id);

  if (categoryGroup) {
    (categoryGroup.name = name), await categoryGroup.save();
    res.status(200).json(categoryGroup);
  } else {
    res.status(404);
    throw new Error("Category update failed");
  }
});

const deleteCategoryGroup = asyncHandler(async (req, res) => {
  const categoryGroup = await CategoryGroup.findById(req.params.id);

  if (categoryGroup) {
    await categoryGroup.remove();
    res.status(200).json(categoryGroup);
  } else {
    res.status(404);
    throw new Error("delete failed");
  }
});

module.exports = {
  createCategoryGroup,
  getAllCategoryGroup,
  getCategoryGroupById,
  updateCategoryGroup,
  deleteCategoryGroup,
};
