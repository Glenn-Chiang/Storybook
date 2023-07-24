require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Post = require("./models/post");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res, next) => {
  const sortBy = req.query.sortBy // dateAdded or lastUpdated
  const sortOrder = req.query.sortOrder // newest or oldest
  Post.find({}).sort({ [sortBy]: sortOrder})
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/posts/:id", (req, res, next) => {
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

app.post("/posts", (req, res, next) => {
  const body = req.body;

  const newPost = new Post({ ...body });

  newPost
    .save()
    .then((savedPost) => {
      res.json(savedPost);
    })
    .catch((error) => next(error));
});

app.put("/posts/:id", (req, res, next) => {
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

app.delete("/posts/:id", (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error); // Pass to next error handler
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
