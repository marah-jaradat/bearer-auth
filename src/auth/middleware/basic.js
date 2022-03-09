"use strict";
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { Users } = require("../models/index-model");
require("dotenv").config();
const JWT = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const basicAuth = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      let basicHeeaders = req.headers.authorization.split(" ");
      console.log(basicHeaders);
      let encoded = basicHeeaders.pop();
      let decoded = base64.decode(encoded);
      let [username, password] = decoded.split(":");

      const User = await user.findOne({ where: { username: username } });
      const PWD = await bcrypt.compare(password, User.password);
      if (PWD) {
        req.User = User;
        console.log(req.User);

        let newToken = JWT.sign({ username: User.username }, SECRET, {
          expiresIn: 900000,
        });
        User.token = newToken;
        res.status(200).json(User);
      } else {
        res.status(403).send("invalid entered Password");
      }
    }
  } catch (error) {
    res.status(403).send("invalid entered Username");
  }
};

module.exports = basicAuth;
