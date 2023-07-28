const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Create new user
usersRouter.post("/", async (req, res, next) => {
  const { username, displayName, password } = req.body;

  const saltRounds = 10;

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      displayName,
      passwordHash,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

// Get all users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("posts");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get specific user's profile
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Get posts by specific user
usersRouter.get("/:userId/posts", async (req, res, next) => {
  const { sortBy, sortOrder } = req.query;
  const sortOptions = { [sortBy]: sortOrder };
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "posts",
      options: { sort: sortOptions },
    });
    const posts = user.posts;
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get all comments by user
usersRouter.get("/:userId/comments", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate("comments").populate("comments.author");
    const comments = user.comments;
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
