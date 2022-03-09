"use strict";
const express = require("express");
const cors = require("cors");
const errorhandler = require("./error-handler-mid/500");
const notFound = require("./error-handler-mid/404");

const usersRoute = require("./auth/router");
const bearerAuth = require("./auth/middleware/bearer");

const { user } = require("./auth/models/index-model");
const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRoute);

app.get("/", (req, res) => {
  res.status(200).send("Home is alive");
});
app.get("/users", bearerAuth, async (req, res) => {
  const usersNeeded = await user.findAll();
  res.status(200).json(usersNeeded);
});

function start(port) {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

app.use(errorhandler);
app.use("*", notFound);

module.exports = {
  app: app,
  start: start,
};
