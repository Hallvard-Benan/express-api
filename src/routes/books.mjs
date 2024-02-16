import { Router } from "express";
import { Book } from "../mongoose/schemas/book.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createBookValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const bookResponse = await Book.find();
  res.send(bookResponse);
});

router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }

    res.send(book);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", checkSchema(createBookValidationSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);

  const newBook = new Book(data);
  try {
    const savedBook = await newBook.save();
    return res.status(201).send(savedBook);
  } catch {
    return res.sendStatus(400);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send({ msg: "Book not found" });
    }

    res.send(updatedBook);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }

    for (const field in body) {
      if (Object.prototype.hasOwnProperty.call(body, field)) {
        book.set(field, body[field]);
      }
    }

    const updatedBook = await book.save();

    res.send(updatedBook);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({ msg: "Book not found" });
    }

    res.send({ msg: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
