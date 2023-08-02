const commentsRouter = require('express').Router()
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment")

// Create a comment under a post
commentsRouter.post("/posts/:postId/comments", async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  const author = await User.findById(req.userId); // Author of comment, not post
  const body = req.body;

  try {
    const comment = new Comment({
      post: post._id,
      author: author._id,
      content: body.content,
      datePosted: body.datePosted,
    });
    // Add comment to comments collection
    const savedComment = await comment.save();
    // Add comment to comments field of post
    post.comments.push(savedComment._id);
    await post.save();
    // Add comment to comments field of user
    author.comments.push(savedComment._id);
    await author.save();

    res.json(savedComment);
  } catch (error) {
    next(error);
  }
});

// Get all comments by user
commentsRouter.get("/users/:userId/comments", async (req, res, next) => {
  const { sortBy, sortOrder } = req.query;
  try {
    const comments = await Comment.find({ author: req.params.userId }).sort({
      [sortBy]: sortOrder,
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter