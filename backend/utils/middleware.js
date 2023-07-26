const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};


const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    req.token = token
  } else {
    req.token = null
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = jwt.verify(req.token, config.SECRET);
  if (!token.id) {
    return res.status(401).json({ error: "invalid token" });
  }
  const user = await User.findById(token.id)
  req.userId = user._id
  next()
}

// Posts can only be updated by their author. Compare id of user making the request with id of author
const userAuthenticator = async (req, res, next) => {
  if (req.userId.toString() !== req.body.author.toString()) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next()
}

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
  userAuthenticator,
  unknownEndpoint,
  errorHandler,
};
