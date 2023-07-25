const postsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

postsRouter.get("/", async (req, res, next) => {
  const sortBy = req.query.sortBy; // dateAdded or lastUpdated
  const sortOrder = req.query.sortOrder; // newest or oldest

  try {
    const posts = await Post.find({})
      .sort({ [sortBy]: sortOrder })
      .populate("author", { username: 1, name: 1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.post("/", async (req, res, next) => {
  const body = req.body;

  try {
    const user = await User.findById(body.userId);
    const newPost = new Post({ ...body, userId: user.id });
    const savedPost = await newPost.save();
    user.posts = [...user.posts, savedPost._id];
    await user.save();

    res.json(savedPost);
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const post = { ...body };

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
