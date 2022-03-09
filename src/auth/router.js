"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("./models/users-model");

const basicAuth = require("./middleware/basic");
const bearerAuth = require("./middleware/bearer");

router.post("/signup", signupHandler);

async function signupHandler(req, res, next) {
  let { username, password } = req.body;

  try {
    let hashedPassword = await bcrypt.hash(password, 5);

    // console.log(hashedPassword);

    const newUser = await Users.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next("can't sign up");
  }
}

router.post("/signin", basicAuth, signinHandler);
async function signinHandler(req, res, next) {
  res.status(200).send(req.Users);
}

router.get("/secret", bearerAuth, secrecHandler);
async function secrecHandler(req, res, next) {
  res.status(200).send(req.Users);
}
module.exports = router;
