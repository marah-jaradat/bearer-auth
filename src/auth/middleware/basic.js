"use strict";
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { user } = require("../models/index-model");

const basicAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let basicHeeaderParts = req.headers.authorization.split(" ");
      let encoded = basicHeeaderParts.pop();
      let decoded = base64.decode(encoded);
      let [username, password] = decoded.split(":");

      const User = await user.findOne({ where: { username: username } });
      const hashedPass = await bcrypt.compare(password, User.password);
      if (hashedPass) {
        req.User = User;
        next();
      } else {
        next("invalid Password");
      }
    }
  } catch (error) {
    next("invalid Username");
  }
};

module.exports = basicAuth;
