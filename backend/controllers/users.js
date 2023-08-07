const usersRouter = require("express").Router();
const User = require("../models/user");
const FriendRequest = require("../models/friendRequest");
const bcrypt = require("bcrypt");
const {
  tokenExtractor,
  userExtractor,
  userAuthenticator,
} = require("../utils/middleware");

// Create new user
usersRouter.post("/", async (req, res, next) => {
  const { username, displayName, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "Username unavailable" });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      displayName,
      passwordHash,
      dateJoined: new Date(),
      about: "",
      posts: [],
      comments: [],
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

// Get all users
usersRouter.get("/", async (req, res, next) => {
  const { searchTerms, searchBy } = req.query;
  let filter = {};

  if (searchTerms?.trim()) {
    filter = { [searchBy]: { $regex: new RegExp(`^${searchTerms}`, "i") } };
  }

  try {
    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user; used for getting basic info e.g. about, displayName
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Get user's friends
usersRouter.get("/:userId/friends", async (req, res, next) => {
  try {
    const friends = await User.find({ friends: { $in: req.params.userId } });
    res.json(friends);
  } catch (error) {
    next(error);
  }
});

// Check if user already has another user in their friends list
// Prevent user from sending friend request to a user who is already their friend
usersRouter.get("/:userId/friends/:friendId"),
  async (req, res, next) => {
    try {
      const areFriends = await User.exists({
        _id: req.params.userId,
        friends: { $in: req.params.friendId },
      });
      res.json(areFriends);
    } catch (error) {
      next(error);
    }
  };

usersRouter.use(tokenExtractor, userExtractor);

// Update user profile
usersRouter.put("/:userId", userAuthenticator, async (req, res, next) => {
  const updatedData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updatedData,
      { new: true, runValidators: true }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Unfriend users mutually
usersRouter.delete(
  "/:userId/friends/:friendId",
  userAuthenticator,
  async (req, res, next) => {
    try {
      // Remove friend from currentUser's friends list
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { friends: req.params.friendId },
      });
      // Remove currentUser from friend's friends list
      await User.findByIdAndUpdate(req.params.friendId, {
        $pull: { friends: req.params.userId },
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = usersRouter;
