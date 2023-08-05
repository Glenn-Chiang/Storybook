const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  dateJoined: Date,
  about: String,
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
      ref: "FriendRequest",
    },
  ],
  friendRequestsSent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest",
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
    delete returnedObject.likedPosts;
    delete returnedObject.friendRequestsReceived;
    delete returnedObject.friendRequestsSent;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
