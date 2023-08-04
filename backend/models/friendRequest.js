const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: String, // Accepted, pending, rejected
  dateSent: Date,
});

friendRequestSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
      ? returnedObject._id.toString()
      : returnedObject.id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;
