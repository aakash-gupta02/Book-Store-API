import { readData, writeData } from "../utils/fileHelpers.js";
import { v4 as uuidv4 } from "uuid";

const BOOKS_FILE = "./models/books.json";

// all books
export const getBooks = async (req, res) => {
  try {
    const books = await readData(BOOKS_FILE);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

// book by id
export const getBookById = async (req, res) => {
  try {
    const books = await readData(BOOKS_FILE);
    const book = books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

// add books
export const addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;

    if (!title || !author || !genre || !publishedYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const books = await readData(BOOKS_FILE);
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id,
    };

    books.push(newBook);
    await writeData(BOOKS_FILE, books);

    res
      .status(201)
      .json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book" });
  }
};

// update book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await readData(BOOKS_FILE);
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (books[bookIndex].userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this book" });
    }

    const updatedBook = {
      ...books[bookIndex],
      ...req.body,
      id,
      userId: books[bookIndex].userId,
    };

    books[bookIndex] = updatedBook;
    await writeData(BOOKS_FILE, books);

    res.status(200).json({ message: "Book updated", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

// delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await readData(BOOKS_FILE);
    const book = books.find((b) => b.id === id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this book" });
    }

    const updatedBooks = books.filter((b) => b.id !== id);
    await writeData(BOOKS_FILE, updatedBooks);

    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

// search book
export const searchBook = async (req, res) => {
  try {
    const searchGenre = req.query.genre;

    if (!searchGenre) {
      return res.status(400).json({ message: "Genre is required" });
    }

    const books = await readData(BOOKS_FILE);
    const filteredBook = books.filter(
      (book) => book.genre.toLowerCase() === searchGenre.toLowerCase()
    );

    res.status(200).json(filteredBook);
  } catch (error) {
    res.status(500).json({ message: "Error searching books" });
  }
};

// pagination
export const getPaginatedBooks = async (req, res) => {
  try {
    const books = await readData(BOOKS_FILE);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.status(200).json({
      page,
      limit,
      total: books.length,
      books: paginatedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching paginated books" });
  }
};
