const postsRouter = require("express").Router();
const { userAuthenticator } = require("../utils/middleware");
const Post = require("../models/post");
const User = require("../models/user");

postsRouter.get("/", async (req, res, next) => {
  const sortBy = req.query.sortBy; // dateAdded or lastUpdated
  const sortOrder = req.query.sortOrder; // desc or asc

  try {
    const posts = await Post.find({})
      .sort({ [sortBy]: sortOrder })
      .populate("author", { username: 1, displayName: 1 });
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
  const authorId = req.userId;

  try {
    const newPost = new Post({ ...body, author: authorId });

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

postsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const post = await Post.findById(req.params.id);

  if (body.title || body.content) {
    // Only allow post author to update its title and content
    if (req.userId.toString() !== post.author.toString()) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    post.title = body.title
    post.content = body.content
    post.lastUpdated = body.lastUpdated
  }
    
  // Increaes likes by 1
  else if (body.likes) {
    post.likes = post.likes ? post.likes + 1 : 1
  }
  
  try {
    const savedPost = await post.save()
    res.json(savedPost);
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:id", userAuthenticator, async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    const authorId = post.author;
    // Delete post from Posts collection
    await Post.findByIdAndDelete(postId);
    // Delete post from 'posts' field in User document
    await User.findByIdAndUpdate(authorId, {
      $pull: { posts: postId },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
