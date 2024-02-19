import { Router } from "express";
import booksRoute from "./books.mjs";
import usersRoute from "./users.mjs";

const router = Router();
router.use("/api/books", booksRoute);
router.use("/api/users", usersRoute);

export default router;
