"use strict";

require("dotenv").config();

const server = require("./src/server");

const { db } = require("./src/auth/models/index-model");

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3002);
  })

  .catch(console.error);
