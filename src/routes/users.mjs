import { Router } from "express";

const router = Router();

import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";

import { createUserHandler } from "../handlers/users.mjs";
import { User } from "../mongoose/schemas/user.mjs";

router.get("/", async (req, res) => {
  try {
    const usersResponse = await User.find().select("_id username displayName");
    res.send(usersResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", checkSchema(createUserValidationSchema), createUserHandler);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.send({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
