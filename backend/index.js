const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "some content",
    dateAdded: new Date(),
    lastUpdated: new Date(),
  },
  {
    id: 2,
    title: "Post 2",
    content: "some other content",
    dateAdded: new Date(),
    lastUpdated: new Date(),
  },
  {
    id: 3,
    title: "Post 3",
    content: "some other content",
    dateAdded: new Date(),
    lastUpdated: new Date(),
  },
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400).json({ error: "title missing" });
  }

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const generateId = () => {
    return Math.random() * 100000000000;
  };

  const id = generateId();

  const newPost = { ...body, id };

  res.json(newPost);
});

app.put("/posts/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id

  if (!body.title) {
    return res.status(400).json({ error: "title missing" });
  }

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  res.json
});

app.delete("/posts/:id", (req, res) => {

  const id = Number(req.params.id)
  res.status(204).end() // Doesn't return data
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
