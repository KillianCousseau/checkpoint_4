const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users.controllers");
const fileUpload = require("../middlewares/multer");

router.get("/", usersControllers.browse);
router.get("/:id", usersControllers.read);
router.post("/", usersControllers.add);
router.put("/:id", fileUpload, usersControllers.edit);
router.delete("/:id", usersControllers.destroy);

module.exports = router;
