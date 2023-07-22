const express = require('express')

const app = express()

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

app.get('/posts', (req, res) => {
  res.json(posts)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})