"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const user = require("./users-model");
require("dotenv").config();

const myPOSTGRES_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(myPOSTGRES_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  user: user(sequelize, DataTypes),
};
