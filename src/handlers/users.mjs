import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/helpers.mjs";
import { User } from "../mongoose/schemas/user.mjs";

export const createUserHandler = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      displayName: savedUser.displayName,
    };
    return res.status(201).send(userResponse);
  } catch (error) {
    return res.sendStatus(400);
  }
};
