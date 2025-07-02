import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBook,
  getPaginatedBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

router.use(protect);

router.get("/search", searchBook);

router.get("/", getPaginatedBooks);

// router.get("/", getBooks);

router.post("/add", addBook);

router.get("/get/:id", getBookById);

router.put("/update/:id", updateBook);

router.delete("/delete/:id", deleteBook);

export default router;
