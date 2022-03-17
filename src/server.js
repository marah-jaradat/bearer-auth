"use strict";
const express = require("express");
const cors = require("cors");
const errorhandler = require("./error-handler-mid/500");
const notFound = require("./error-handler-mid/404");
const router = require("./routes/router");
const secret = require("./routes/router");
const bearerAuth = require("./auth/middleware/bearer");
const { user } = require("./auth/models/index-model");
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);
app.use(secret);

app.get("/", (req, res) => {
  res.status(200).send("Welcome home");
});

app.get("/users", bearerAuth, async (req, res) => {
  const usersNeeded = await user.findAll();
  res.status(200).json(usersNeeded);
});

app.use(errorhandler);
app.use("*", notFound);

function start(port) {
  app.listen(port, () => {
    console.log("server is running probably on port " + process.env.PORT);
  });
}

module.exports = {
  app: app,
  start: start,
};
