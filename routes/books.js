import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a book
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: "Book added!", book });
});

export default router;
