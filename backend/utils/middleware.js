const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("../models/user");
const Post = require("../models/post");

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  // logger.info(authorization)
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    req.token = token;
  } else {
    logger.error("missing token");
    return res.status(401).json({ error: "missing token" });
  }
  next();
};

const userExtractor = async (req, res, next) => {
  // console.log(`Token: '${req.token}'`)
  // console.log('Secret:', config.SECRET)
  try {
    const token = jwt.verify(req.token, config.SECRET);
    if (!token.id) {
      return res.status(401).json({ error: "invalid token" });
    }
    const user = await User.findById(token.id);
    if (!user) {
      return res.status(401).json({ error: "request made by unrecognized user"})
    }
    req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: error.message });
  }
  next(error); // Pass to next error handler
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
