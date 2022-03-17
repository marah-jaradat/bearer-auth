"use strict";

const server = require("../src/server");
const { expect, it } = require("@jest/globals");
const supertest = require("supertest");
const request = supertest(server.app);
const { db } = require("../src/auth/models/index-model");
// const basic = require("../src/auth/middleware/basic");

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("testing basic-server", () => {
  it("handles wrong path", async () => {
    const response = await request.get("/wrongPath");
    expect(response.status).toBe(404);
  });

  it("404 not found request", async () => {
    const response = await request.post("/");
    expect(response.status).toBe(404);
  });
});

beforeEach(async () => {
  let body = {
    username: "user1",
    password: "testtest",
  };
  await request.post("/signup").send(body);
});

describe("testing basic-auth routers", () => {
  it("test signup route", async () => {
    const response = await request.post("/signup").send({
      username: "test",
      password: "test123",
    });
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual("test");
  });

  it("test signin route", async () => {
    const response = await request.post("/signin").auth("test", "test123");
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual("test");
  });

  it("test wrong username", async () => {
    const response = await await request
      .post("/signin")
      .auth("teeeeeest", "test123");
    expect(response.status).toBe(500);
  });

  it("test wrong password", async () => {
    const response = await request.post("/signin").auth("test", "teeeeest1234");
    expect(response.status).toBe(500);
  });
});
