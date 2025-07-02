# 📚 Bookstore REST API (File-Based, Auth Protected)

A simple REST API built using **Node.js + Express** for managing a Bookstore.  
Includes **user authentication (JWT)**, **file-based storage**, **CRUD operations**, and **bonus features** like search and pagination.

---

## 🚀 Setup Instructions

1. **Clone the repo**  
   ```
   git clone https://github.com/aakash-gupta02/Book-Store-API
   cd backend-server
  ```


2. **Install Dependencies**

   ```
    npm install
    ```

3. **Create `.env` file**

   ```
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the server**

   ```bash
   npm start
   ```

---

## 📂 Project Structure

```
├── controllers/
│   ├── auth.controller.js
│   └── book.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── logger.middleware.js
├── models/
│   ├── users.json
│   └── books.json
├── routes/
│   ├── auth.routes.js
│   └── book.routes.js
├── utils/
│   └── fileHelpers.js
├── .env
├── .gitignore
├── app.js
└── README.md
```

---

## 🔐 Authentication Routes (Public)

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| POST   | `/api/register` | Register a new user     |
| POST   | `/api/login`    | Login and get JWT token |

---

## 📚 Book Routes (Protected – Requires Token)

> Add `Authorization: Bearer <token>` in headers

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| GET    | `/api/books`               | Get paginated list of books |
| GET    | `/api/books/search?genre=` | Search books by genre       |
| GET    | `/api/books/get/:id`       | Get a book by ID            |
| POST   | `/api/books/add`           | Add a new book              |
| PUT    | `/api/books/update/:id`    | Update book (only by owner) |
| DELETE | `/api/books/delete/:id`    | Delete book (only by owner) |

---

## 🧪 Postman Testing Guide

1. **Register a User**

   * POST `/api/register`
   * Body (JSON):

     ```json
     {
       "email": "test@example.com",
       "password": "secret123"
     }
     ```

2. **Login to Get Token**

   * POST `/api/login`
   * Response:

     ```json
     {
       "message": "Login successful",
       "token": "<your_token_here>"
     }
     ```

3. **Set Authorization Header**

   * Key: `Authorization`
   * Value: `Bearer <your_token_here>`

4. **Add Book**

   * POST `/api/books/add`
   * Body:

     ```json
     {
       "title": "The Alchemist",
       "author": "Paulo Coelho",
       "genre": "Fiction",
       "publishedYear": 1988
     }
     ```

5. **Search Book**

   * GET `/api/books/search?genre=Fiction`

6. **Paginated Books**

   * GET `/api/books?page=1&limit=5`

---

## 🌟 Bonus Features

* ✅ Search by genre: `/books/search?genre=Fiction`
* ✅ Pagination support: `/books?page=1&limit=10`
* ✅ UUID for book IDs
* ✅ Request logging via custom middleware

---

## 📜 Tech Stack

* Node.js
* Express
* JSON Web Tokens (JWT)
* bcryptjs
* uuid
* File system (`fs.promises`)
---

## 📂 Sample Data

### `models/users.json`

```json
[]
````

### `models/books.json`

```json
[]
````

Made with 💙 by [Aakash Gupta](https://github.com/aakash-gupta02)



