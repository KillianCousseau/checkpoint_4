const express = require("express");

const router = express.Router();

const usersRoutes = require("./routes/users.routes");
const booksRoutes = require("./routes/books.routes");
const authRoutes = require("./routes/auth.routes");
const { verifyJWT } = require("./helpers/jwtHelper");

router.use("/users", verifyJWT, usersRoutes);
router.use("/books", verifyJWT, booksRoutes);
router.use("/auth", authRoutes);

module.exports = router;
