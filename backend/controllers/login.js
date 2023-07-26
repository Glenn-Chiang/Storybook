const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "username not recognized" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ error: "invalid password" });
    }

    const token = jwt.sign({ username, id: user._id }, process.env.SECRET);

    res.status(200).send({ token, username, name: user.name });
    
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
