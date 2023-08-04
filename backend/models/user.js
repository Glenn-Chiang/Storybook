const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  about: String,
  passwordHash: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId, // Array will contain objectIds of documents in the Post collection
      ref: "Post", // Reference to Post collection
      default: [],
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  friendRequestsReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  friendRequestsSent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
      ? returnedObject._id.toString()
      : returnedObject.id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
