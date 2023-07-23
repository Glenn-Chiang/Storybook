require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Post = require("./models/post");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  Post.find({}).then((posts) => {
    res.json(posts);
  });
});

app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id).then(post => {
    res.json(post)
  })
})

app.post("/posts", (req, res) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400).json({ error: "title missing" });
  }

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const newPost = new Post({ ...body });

  newPost.save().then((savedPost) => {
    res.json(savedPost);
  });
});

app.put("/posts/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.title) {
    return res.status(400).json({ error: "title missing" });
  }

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  res.json;
});

app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  res.status(204).end(); // Doesn't return data
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
