const express = require("express");
const {
  createTable,
  getTables,
  deleteTable,
  updateTable,
  getTableId,
} = require("../controllers/table.controller");
const tableRouter = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

tableRouter.route("/").post(protect, admin, createTable).get(getTables);
tableRouter
  .route("/:id")
  .get(getTableId)
  .put(protect, admin, updateTable)
  .delete(protect, admin, deleteTable);

module.exports = tableRouter;
