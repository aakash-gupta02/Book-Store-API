import express from "express";
import dotenv from "dotenv";
import logger  from "./middleware/logger.middleware.js";


import authroute from "./routes/auth.routes.js"
import bookroute from "./routes/book.routes.js"


import protect from "./middleware/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(logger)

dotenv.config();


app.get("/",protect, (req, res) => {
    res.send("Hello Bookstore");
});

app.use("/auth", authroute )
app.use("/book", bookroute)



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT} `);
});
