import request from "supertest";
import { createApp } from "../createApp.mjs";
import mongoose from "mongoose";

describe("create user and login", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://127.0.0.1/express_tutorial_test")
      .then(() => {
        console.log("connected to test database");
      })
      .catch((err) => {
        console.log("error", err);
      });

    app = createApp();
  });

  it("should create user", async () => {
    const response = await request(app).post("/api/users").send({
      username: "adam123",
      password: "password",
      displayName: "Adam The Developer",
    });

    expect(response.statusCode).toBe(201);
  });

  it("should log the user in, visit /api/auth/status and return logged in user ", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({ username: "adam123", password: "password" })
      .then((res) => {
        console.log(res.headers["set-cookie"]);
        return request(app)
          .get("/api/auth/status")
          .set("Cookie", res.headers["set-cookie"]);
      });
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
