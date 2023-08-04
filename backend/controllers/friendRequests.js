const friendRequestsRouter = require("express").Router();
const {
  tokenExtractor,
  userExtractor,
  userAuthenticator,
} = require("../utils/middleware");
const User = require("../models/user");
const FriendRequest = require("../models/friendRequest");

friendRequestsRouter.use(tokenExtractor, userExtractor);

// Send friend request to user
friendRequestsRouter.post(
  "/users/:userId/friendRequests",
  async (req, res, next) => {
    const sender = req.userId;
    const recipient = req.params.userId;
    try {
      const friendRequest = new FriendRequest({
        sender,
        recipient,
        dateSent: new Date(),
        status: "pending",
      });

      const savedFriendRequest = await friendRequest.save();

      // Update recipient
      await User.findByIdAndUpdate(
        recipient,
        {
          $push: { friendRequestsReceived: savedFriendRequest },
        },
        { new: true, runValidators: true }
      );
      // Update sender
      await User.findByIdAndUpdate(sender, {
        $push: { friendRequestsSent: savedFriendRequest },
      });

      res.json(savedFriendRequest);
    } catch (error) {
      next(error);
    }
  }
);

// Get user's sent and received friend requests
friendRequestsRouter.get(
  "/users/:userId/friendRequests/sent",
  userAuthenticator,
  async (req, res, next) => {
    try {
      const sentRequests = await FriendRequest.find({
        sender: req.params.userId,
      });
      res.json(sentRequests);
    } catch (error) {
      next(error);
    }
  }
);

friendRequestsRouter.get(
  "/users/:userId/friendRequests/received",
  userAuthenticator,
  async (req, res, next) => {
    try {
      const receivedRequests = await FriendRequest.find({
        recipient: req.params.userId,
      });
      res.json(receivedRequests);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = friendRequestsRouter;
