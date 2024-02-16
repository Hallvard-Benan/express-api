import { Router } from "express";
import booksRoute from "./books.mjs";
import reviewsRoute from "./reviews.mjs";
import usersRoute from "./users.mjs";

const router = Router();
router.use("/api/books", booksRoute);
router.use("/api/reviews", reviewsRoute);
router.use("/api/users", usersRoute);

export default router;
