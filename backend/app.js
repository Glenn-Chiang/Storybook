const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const {
  requestLogger,
  errorHandler,
  unknownEndpoint,
} = require("./utils/middleware");
const mongoose = require("mongoose");

const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const commentsRouter = require("./controllers/comments");
const loginRouter = require("./controllers/login");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB at", config.MONGODB_URI);

async function buildApp() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB");
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.static("build"));
  app.use(requestLogger);

  app.use("/login", loginRouter);
  app.use("/users", usersRouter);
  app.use("/posts", postsRouter);
  // app.use("/comments", commentsRouter);

  app.use(errorHandler);
  app.use(unknownEndpoint);
}

buildApp();

module.exports = app;
