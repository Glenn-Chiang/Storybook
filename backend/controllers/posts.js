const postsRouter = require('express').Router()
const Post = require('../models/post')

postsRouter.get("/", (req, res, next) => {
  const sortBy = req.query.sortBy; // dateAdded or lastUpdated
  const sortOrder = req.query.sortOrder; // newest or oldest
  Post.find({})
    .sort({ [sortBy]: sortOrder })
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

postsRouter.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

postsRouter.post("/", (req, res, next) => {
  const body = req.body;

  const newPost = new Post({ ...body });

  newPost
    .save()
    .then((savedPost) => {
      res.json(savedPost);
    })
    .catch((error) => next(error));
});

postsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const post = { ...body };

  Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
    runValidators: true, // Validation is not run by default
    context: "query",
  })
    .then((updatedPost) => res.json(updatedPost))
    .catch((error) => next(error));
});

postsRouter.delete("/:id", (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = postsRouter