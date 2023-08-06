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
    const friends = await User.find({friends: {$in: req.params.userId}})
    res.json(friends)
  } catch (error) {
    next(error)
  }
})

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

// // Add friend to user's friends field when user accepts friend request
// usersRouter.put("/:userId/friends", userAuthenticator, async (req, res, next) => {
//   const sender = req.body.friendId
//   const recipient = req.params.userId
//   try {
//     // Add sender to recipient's friends field
//     const updatedUser = await User.findByIdAndUpdate(recipient, {
//       $push: {friends: sender}
//     })
//     // Add recipient to sender's friends field
//     await User.findByIdAndUpdate(sender, {
//       $push: {friends, recipient}
//     })

//     res.json(updatedUser)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = usersRouter;
