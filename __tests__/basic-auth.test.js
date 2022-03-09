"use strict";

const basicAuth = require("../src/auth/middleware/basic");
const { db, users } = require("../src/auth/models/index-model");
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);

let userInfo = {
  admin: { username: "admin-basic", password: "password" },
};

beforeAll(async (done) => {
  await db.sync();
  await users.create(userInfo.admin);
  done();
});
afterAll(async (done) => {
  await db.drop();
  done();
});

describe("testing basic-Auth", () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe("user authentication", () => {
    it("fails a login for a user (admin) with the incorrect basic credentials", () => {
      req.headers = {
        authorization: "Basic YWRtaW46Zm9v",
      };

      return basicAuth(req, res, next).then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
      });
    }); // it()

    it("logs in an admin user with the right credentials", () => {
      req.headers = {
        authorization: "Basic YWRtaW46cGFzc3dvcmQ=",
      };

      return basicAuth(req, res, next).then(() => {
        expect(next).toHaveBeenCalledWith();
      });
    });
  });
});
