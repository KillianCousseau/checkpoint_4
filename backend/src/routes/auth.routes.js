const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/auth.controllers");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const checkUserExists = require("../middlewares/checkUserExists");

router.get("/logout", authControllers.logout);
router.post("/login", checkUserExists, authControllers.login);
router.post("/signup", checkUserDoesntExists, authControllers.signUp);

module.exports = router;
