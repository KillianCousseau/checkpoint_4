const express = require("express");

const router = express.Router();

const booksControllers = require("../controllers/books.controllers");

router.get("/", booksControllers.browse);
router.get("/:id", booksControllers.read);
router.post("/", booksControllers.add);
router.post("/list", booksControllers.addBookList);
router.put("/list", booksControllers.editBookList);
router.put("/:id", booksControllers.edit);
router.delete("/list", booksControllers.destroyBookList);
router.delete("/:id", booksControllers.destroy);

module.exports = router;
