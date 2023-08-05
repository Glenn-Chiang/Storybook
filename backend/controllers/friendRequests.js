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
          $push: { friendRequestsReceived: savedFriendRequest._id },
        },
        { new: true, runValidators: true }
      );
      // Update sender
      await User.findByIdAndUpdate(sender, {
        $push: { friendRequestsSent: savedFriendRequest._id },
      });

      res.json(savedFriendRequest);
    } catch (error) {
      next(error);
    }
  }
);

// friendRequestsRouter.use(userAuthenticator);

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
  async (req, res, next) => {
    try {
      const deletedRequest = await FriendRequest.findByIdAndDelete(
        req.params.requestId
      );
      // Delete request from sender's sent requests
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { friendRequestsSent: deletedRequest._id },
      });
      // Delete request from recipient's received requests
      await User.findByIdAndUpdate(deletedRequest.recipient, {
        $pull: { friendRequestsReceived: deletedRequest._id },
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

// Accept/reject friend request
friendRequestsRouter.put(
  "/users/:userId/friendRequests/received/:requestId/:status",
  async (req, res, next) => {
    try {
      // Update request status
      const updatedRequest = await FriendRequest.findByIdAndUpdate(
        req.params.requestId,
        {
          status: req.params.status,
        }
      );
      const sender = updatedRequest.sender;
      const recipient = updatedRequest.recipient;
      // Remove request from sender's sent requests, regardless if request is accepted or rejected
      await User.findByIdAndUpdate(sender, {
        $pull: { friendRequestsSent: updatedRequest._id },
      });
      // Add each user to the other's friends field if request is accepted
      if (req.params.status === "accepted") {
        // Add sender as friend to recipient
        await User.findByIdAndUpdate(recipient, {
          $push: { friends: sender },
        });
        // Add recipient as friend to sender
        await User.findByIdAndUpdate(sender, {
          $push: { friends: recipient },
        });
      }
      res.json(updatedRequest);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = friendRequestsRouter;
