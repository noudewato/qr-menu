const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .sort({ name: "ascending" })
    .populate("user", "username");
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const { name, description, price, image, category } = req.body;

  if (!image) {
    throw new Error("image is required");
  }

  const newProduct = new Product(req.body);

  const existingProducts = await Product.findOne({ name });

  if (existingProducts) {
    res.status(404);
    throw new Error("name already exists");
  }

  const categoryFound = await Category.findOne({ name: category });

  if (!categoryFound) {
    res.status(404);
    throw new Error("Category not found, create one");
  }

  const saveProduct = await newProduct.save();

  categoryFound.products.push(saveProduct);
  await categoryFound.save();

  if (saveProduct) {
    res.status(201).json(saveProduct);
  } else {
    res.status(404);
    throw new Error("Could not save Product, try again");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, category, price, isActive } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.image = image),
      (product.description = description),
      (product.category = category),
      (product.price = price);
    product.isActive = isActive;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
