import * as validator from "express-validator";
import * as helpers from "../utils/helpers.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";
import { User } from "../mongoose/schemas/user.mjs";

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "invalid field" }]),
  })),
  matchedData: jest.fn(() => ({
    username: "test",
    password: "password",
    displayName: "test_name",
  })),
}));

jest.mock("../utils/helpers.mjs", () => ({
  hashPassword: jest.fn((password) => `hashed_${password}`),
}));

jest.mock("../mongoose/schemas/user.mjs");

const mockReq = { findUserIndex: 1 };
const mockRes = {
  sendStatus: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => mockRes),
};

describe("get users", () => {
  it("Should get use by id", () => {
    getUserByIdHandler(mockReq, mockRes);
    // expect(mockRes.send).toHaveBeenCalledWith(mockUsers[mockReq.findUserIndex]);
    expect(mockRes.send).toHaveBeenCalledTimes(1);
  });

  it("Responds with 404 if user is not found", () => {
    const copyMockReq = { ...mockReq, findUserIndex: 100 };
    getUserByIdHandler(copyMockReq, mockRes);
    expect(mockRes.sendStatus).toHaveBeenCalledWith(404);
    expect(mockRes.send).not.toHaveBeenCalled();
  });
});

describe("Create User", () => {
  const mockReq = {};

  it("should return a 400 status when there are errors", async () => {
    await createUserHandler(mockReq, mockRes);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(validator.validationResult).toHaveBeenCalledWith(mockReq);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith([{ msg: "invalid field" }]);
  });

  it("Should return 201 status and the created user", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockResolvedValueOnce({
        id: 1,
        username: "test",
        password: "hashed_password",
        displayName: "test_name",
      });

    await createUserHandler(mockReq, mockRes);
    expect(validator.matchedData).toHaveBeenCalledWith(mockReq);
    expect(helpers.hashPassword).toHaveBeenCalledWith("password");
    expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
    expect(User).toHaveBeenCalledWith({
      username: "test",
      password: "hashed_password",
      displayName: "test_name",
    });

    expect(saveMethod).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      id: 1,
      username: "test",
      password: "hashed_password",
      displayName: "test_name",
    });
  });

  it("sends status 400 when database fails to save user", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));
    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockImplementationOnce(() => Promise.reject("failed to save user"));

    await createUserHandler(mockReq, mockRes);

    expect(saveMethod).toHaveBeenCalled();
    expect(mockRes.sendStatus).toHaveBeenLastCalledWith(400);
  });
});
