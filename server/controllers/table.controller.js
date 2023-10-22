const Table = require("../models/table.model");
const asyncHandler = require("express-async-handler");

const createTable = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const { tablePosition } = req.body;

  const newTable = new Table(req.body);

  const existingTable = await Table.findOne({ tablePosition });

  if (existingTable) {
    res.status(400);
    throw new Error("table already exists");
  }

  const saveTable = await newTable.save();

  if (saveTable) {
    res.status(201).json(saveTable);
  } else {
    res.status(404);
    throw new Error("Could not save Product, Try again");
  }
});

const getTables = asyncHandler(async (req, res) => {
  let table = Table.find();

  const alltable = await table
    .find()
    .sort({ tablePosition: "asc" })
    .populate("user", "name");

  if (alltable) {
    res.status(200).json(alltable);
  } else {
    res.status(404);
    throw new Error("tables not found");
  }
});

const getTableId = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table) {
    res.status(200).json(table);
  } else {
    res.status(404);
    throw new Error("table not found");
  }
});

const updateTable = asyncHandler(async (req, res) => {
  const { tablePosition } = req.body;
  const table = await Table.findById(req.params.id);

  if (table) {
    (table.tablePosition = tablePosition), await table.save();
    res.status(200).json(table);
  } else {
    res.status(404);
    throw new Error("table update failed");
  }
});

const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);

  if (table) {
    await table.remove();
    res.status(200).json(table);
  } else {
    res.status(404);
    throw new Error("delete failed");
  }
});

module.exports = {
  createTable,
  getTables,
  getTableId,
  updateTable,
  deleteTable,
};
