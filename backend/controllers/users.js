const usersRouter = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
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

// Get user object
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

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

// Send friend request to user
usersRouter.post("/:userId/friendRequests", async (req, res, next) => {
  const requestingUser = req.userId;
  const receivingUser = req.params.userId;
  try {
    // Update receiving user's received friend requests
    const updatedUser = await User.findByIdAndUpdate(
      receivingUser,
      {
        $push: { friendRequestsReceived: requestingUser },
      },
      { new: true, runValidators: true }
    );
    // Update requesting user's sent friend requests
    await User.findByIdAndUpdate(requestingUser, {
      $push: { friendRequestsSent: receivingUser },
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Get user's received friend requests
usersRouter.get("/:userId/friendRequests/received", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "friendRequestsReceived"
    );
    res.json(user.friendRequestsReceived);
  } catch (error) {
    next(error);
  }
});

// Get user's sent friend requests
usersRouter.get("/:userId/friendRequests/sent", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "friendRequestsSent"
    );
    res.json(user.friendRequestsSent);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
