const commentsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

// Get all comments by user
commentsRouter.get("/users/:userId/comments", async (req, res, next) => {
  const { sortBy, sortOrder } = req.query;
  try {
    const comments = await Comment.find({ author: req.params.userId })
      .sort({
        [sortBy]: sortOrder,
      })
      .populate("author")
      .populate("post");
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// Get all comments under post
commentsRouter.get("/posts/:postId/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ datePosted: "desc" })
      .populate("author");
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.use(tokenExtractor, userExtractor);

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

const authorAuthenticator = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    const authorId = comment.author;
    if (req.userId.toString() !== authorId.toString()) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Edit comment
commentsRouter.put(
  "/:commentId",
  authorAuthenticator,
  async (req, res, next) => {
    const commentId = req.params.commentId;
    const content = req.body.content;
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true, runValidators: true }
      );
      res.json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
);

// Delete comment
commentsRouter.delete(
  "/:commentId",
  authorAuthenticator,
  async (req, res, next) => {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    try {
      await Comment.findByIdAndDelete(commentId);

      // Remove comment from post's comments field
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentId },
      });

      // Remove comment from author's comments field
      await User.findByIdAndUpdate(comment.author, {
        $pull: { comments: commentId },
      });

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = commentsRouter;
