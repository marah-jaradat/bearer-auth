"use strict";

const { user } = require("../models/index-model");
const JWT = require("jsonwebtoken");
const SECRET = process.env.SECRET || "new secret";

const bearerAuth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let bearerHeader = req.headers.authorization.split(" ");
      let token = bearerHeader.pop();

      if (token) {
        const userToken = JWT.verify(token, SECRET);
        const User = await user.findOne({
          where: { username: userToken.username },
        });
        // console.log(userToken);
        if (User) {
          req.token = userToken;
          req.User = User;
          next();
        } else {
          res.status(403).send("invalid user");
        }
      }
    } catch (error) {
      res.status(403).send(`invalid Token ${error}`);
    }
  }
};
module.exports = bearerAuth;
