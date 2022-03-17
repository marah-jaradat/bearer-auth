"use strict";
const express = require("express");
const { user } = require("../auth/models/index-model");
const routers = express.Router();
const bcrypt = require("bcrypt");
const basicAuth = require("../auth/middleware/basic");
const bearerAuth = require("../auth/middleware/bearer");

routers.post("/signup", async (req, res, next) => {
  let { username, password } = req.body;
  try {
    let hashedPWD = await bcrypt.hash(password, 5);
    const sendingNewUser = await user.create({
      username: username,
      password: hashedPWD,
    });
    res.status(201).json(sendingNewUser);
  } catch (error) {
    console.log(error);
    next("invalid signUp");
  }
});

routers.post("/signin", basicAuth, (req, res) => {
  res.status(200).json(req.User);
});

routers.get("/secret", bearerAuth, secrecHandler);
async function secrecHandler(req, res, next) {
  res.status(200).send(req.Users);
}

module.exports = routers;
