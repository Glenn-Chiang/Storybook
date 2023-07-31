const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const loginRouter = require("express").Router();
const config = require('../utils/config')

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Username not recognized" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ username, id: user._id }, config.SECRET);

    res.status(200).send({ token, userId: user._id.toString(), username, displayName: user.displayName });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
