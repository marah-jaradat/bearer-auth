"use strict";

require("dotenv").config();
const express = require("express");

const server = require("./src/server.js");
const { db } = require("./src/auth/models/index-model");

const app = express();
app.use(express.json());

db.sync().then(() => {
  server.start(process.env.PORT || 3001);
});
