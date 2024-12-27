const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createDefect, assignDefect, addComment } = require("../controllers/defect");


const router = express.Router();

router.post("/create-defect", authentication, isUser, createDefect);
router.put("/:id/assign", authentication, isUser, assignDefect);
router.post("/:id/comment-add", authentication, isUser, addComment);

module.exports = router