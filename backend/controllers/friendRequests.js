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

// Get friend requests sent by user
friendRequestsRouter.get(
  "/users/:userId/friendRequests/sent",
  userAuthenticator,
  async (req, res, next) => {
    try {
      const sentRequests = await FriendRequest.find({
        sender: req.params.userId,
      }).populate("recipient");
      res.json(sentRequests);
    } catch (error) {
      next(error);
    }
  }
);

// Get friend requests received by user
friendRequestsRouter.get(
  "/users/:userId/friendRequests/received",
  userAuthenticator,
  async (req, res, next) => {
    try {
      const receivedRequests = await FriendRequest.find({
        recipient: req.params.userId,
      }).populate("sender");
      res.json(receivedRequests);
    } catch (error) {
      next(error);
    }
  }
);

// Cancel a friend request sent by user
friendRequestsRouter.delete(
  "/users/:userId/friendRequests/sent/:requestId",
  userAuthenticator,
  async (req, res, next) => {
    try {
      const deletedRequest = await FriendRequest.findByIdAndDelete(
        req.params.requestId
      );
      // Delete request from sender's sent requests
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { friendRequestsSent: req.params.requestId },
      });
      // Delete request from recipient's received requests
      await User.findByIdAndUpdate(deletedRequest.recipient, {
        $pull: { friendRequestsReceived: req.params.requestId },
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = friendRequestsRouter;
