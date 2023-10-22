const express = require("express");
const authRouter = express.Router();
const {loginUser, getUserProfile, createUser, updateUserProfile, getUsers, deleteUser, updateUser, getUserByID} = require('../controllers/user.controller')
const { protect, admin } = require("../middleware/authMiddleware");
authRouter.post(
  "/login", loginUser
);

authRouter.route('/profile').get(protect, getUserProfile)
authRouter.route("/udpdateUserProfile").put(protect, updateUserProfile);
authRouter.route('/').post(createUser);
authRouter.route("/").get(protect, admin, getUsers);
authRouter
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

module.exports = authRouter;
