const mongoose = require("mongoose");

const categoryGroupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CategoryGroup = mongoose.model("CategoryGroup", categoryGroupSchema);

module.exports = CategoryGroup;
