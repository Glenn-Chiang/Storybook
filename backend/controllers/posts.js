const postsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const {
  tokenExtractor,
  userExtractor,
  userAuthenticator,
  authorAuthenticator,
} = require("../utils/middleware");

postsRouter.get("/", async (req, res, next) => {
  const sortBy = req.query.sortBy; // dateAdded or lastUpdated
  const sortOrder = req.query.sortOrder; // desc or asc

  try {
    const posts = await Post.find({})
      .sort({ [sortBy]: sortOrder })
      .populate("author", { username: 1, displayName: 1 });

    console.log(posts[0]);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
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

// Get user's posts
postsRouter.get("/users/:userId/posts", async (req, res, next) => {
  const { sortBy, sortOrder } = req.query;

  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ [sortBy]: sortOrder })
      .populate("author");

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.use(tokenExtractor, userExtractor); // All routes below require the user to be signed in

// Get user's liked posts (private)
postsRouter.get(
  "/users/:userId/likedPosts",
  userAuthenticator,
  async (req, res, next) => {
    const { sortBy, sortOrder } = req.query;
    try {
      const posts = await Post.find({ likedBy: { $in: [req.params.userId] } })
        .sort({ [sortBy]: sortOrder })
        .populate("author");

      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);

// Create a post
postsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const authorId = req.userId;

  try {
    const newPost = new Post({
      ...body,
      author: authorId,
      likes: 0,
      comments: [],
    });

    // Update Posts collection
    const savedPost = await newPost.save();
    // Update 'posts' field in User document
    await User.findByIdAndUpdate(authorId, {
      $push: { posts: savedPost._id },
    });

    res.json(savedPost);
  } catch (error) {
    next(error);
  }
});

// Update likes; user does not have to be author of post
// If user likes a post that they have already liked, the post will be unliked by the user
postsRouter.put("/:postId/likes", async (req, res, next) => {
  const postId = req.params.postId;
  const currentUser = await User.findById(req.userId);
  const alreadyLiked = currentUser.likedPosts.includes(postId);

  try {
    const updatedPost = alreadyLiked
      ? // Remove user from list of users who liked post
        await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { likedBy: currentUser._id },
          },
          { new: true }
        )
      : // Add user to list of users who liked post
        await Post.findByIdAndUpdate(
          postId,
          {
            $push: { likedBy: currentUser._id },
          },
          { new: true }
        );

    if (alreadyLiked) {
      // Remove post from user's list of liked posts
      await User.findByIdAndUpdate(req.userId, {
        $pull: { likedPosts: updatedPost._id },
      });
    } else {
      // Add post to user's list of liked posts
      await User.findByIdAndUpdate(req.userId, {
        $push: { likedPosts: updatedPost._id },
      });
    }

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// Update title or content; requires user to be author of post
postsRouter.put(
  "/:postId/edit",
  authorAuthenticator,
  async (req, res, next) => {
    const { title, content, lastUpdated } = req.body;

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          title,
          content,
          lastUpdated,
        },
        { new: true, runValidators: true }
      );
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

// Users can only delete their own posts
postsRouter.delete("/:postId", authorAuthenticator, async (req, res, next) => {
  const postId = req.params.postId;
  try {
    // Delete post from Posts collection
    await Post.findByIdAndDelete(postId);
    // Delete post from 'posts' field in User document
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: postId },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
