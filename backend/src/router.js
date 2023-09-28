const express = require("express");

const router = express.Router();

const usersRoutes = require("./routes/users.routes");
const booksRoutes = require("./routes/books.routes");
const authRoutes = require("./routes/auth.routes");

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/auth", authRoutes);

module.exports = router;
