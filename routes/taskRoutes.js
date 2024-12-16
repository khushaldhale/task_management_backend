const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createTask, deleteTask, updateTask, getAllTask } = require("../controllers/task");
const router = express.Router();


router.post("/", authentication, isUser, createTask);
router.delete("/:id", authentication, isUser, deleteTask);
router.put("/:id", authentication, isUser, updateTask);
router.get("/", authentication, isUser, getAllTask);


module.exports = router