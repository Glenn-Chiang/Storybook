const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, minLength: 5 },
  datePosted: Date,
  lastUpdated: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
  ],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject.likedBy; // likedBy is private data that only post author can access
    returnedObject.datePosted = (new Date(returnedObject.datePosted)).toLocaleString()
    returnedObject.lastUpdated = (new Date(returnedObject.datePosted)).toLocaleString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
