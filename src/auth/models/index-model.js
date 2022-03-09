"use strict";

const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config();

const Users = require("./users-model");

const DATABASE_URL =
  process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL;

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

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  Users: Users(sequelize, DataTypes),
};
