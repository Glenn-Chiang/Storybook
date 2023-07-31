const usersRouter = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
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

  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ [sortBy]: sortOrder })
      .populate("author")
      .populate({
        path: "comments",
        options: {
          sort: { datePosted: -1 },
        },
        populate: {
          path: "author",
          select: "username displayName",
        },
      });

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get all comments by user
usersRouter.get("/:userId/comments", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("comments")
      .populate("comments.author");
    const comments = user.comments;
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

const userAuthenticator = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Update user profile
usersRouter.put("/:userId", userAuthenticator, async (req, res, next) => {
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updatedData);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
