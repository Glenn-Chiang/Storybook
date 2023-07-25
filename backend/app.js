const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const mongoose = require("mongoose");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB at", config.MONGODB_URI);

try {
  await mongoose.connect(url);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connecting to MongoDB:", error.message);
}

mongoose
  .connect(url)
  .then((res) => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error connecting to MongoDB"));

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
