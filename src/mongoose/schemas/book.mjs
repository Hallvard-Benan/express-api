import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  finished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Book = mongoose.model("Book", BookSchema);
