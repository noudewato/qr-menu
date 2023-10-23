const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
// const errorResponse = require("../utils/errorResponse");
const generateToken = require("../utils/generateToken");

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    throw new Error("Invalid username and password");
  }

  if (!password) {
    throw new Error("password is required");
  }

  const user = await User.findOne({ username });
  const pass = await User.findOne({ password });

  if (user && pass /* && (await user.matchPassword(password))*/) {
    res.json({
      _id: user._id,
      username: user.username,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username and password");
  }
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
      phoneNumber: user.phoneNumber,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error("User Not Authorized");
  }
});

const createUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, phoneNumber, isAdmin } = req.body;

  if (!fullName || !username || !phoneNumber || !password) {
    throw new Error("All field are required");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    fullName,
    username,
    password,
    phoneNumber,
    isAdmin,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      isAdmin: user.isAdmin,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Cannot not create user");
  }
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.username = req.body.username || user.username;
    user.image = req.body.image || user.image;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }

  const updatedUser = await user.save();

  if (updatedUser) {
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Cannot Update");
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find({});
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserByID = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      fullName: user.fullName,
      username: user.username,
      phoneNumber: user.phoneNumber,
      image: user.image,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.username = req.body.username || user.username;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.isAdmin = req.body.isAdmin;
  }

  const updatedUser = await user.save();

  if (updatedUser) {
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      phoneNumber: updateUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Cannot Update");
  }
});

module.exports = {
  loginUser,
  getUserProfile,
  getUsers,
  createUser,
  updateUserProfile,
  deleteUser,
  getUserByID,
  updateUser,
};
