const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createTask, deleteTask, updateTask, getAllTask, markAsComplete, markAsProgress, getParticularTask, filterTaskByStatus, filterTaskByCategory } = require("../controllers/task");
const router = express.Router();


router.post("/", authentication, isUser, createTask);
router.get("/status", authentication, isUser, filterTaskByStatus);
router.get("/cat", authentication, isUser, filterTaskByCategory);
router.delete("/:id", authentication, isUser, deleteTask);
router.put("/:id", authentication, isUser, updateTask);
router.get("/", authentication, isUser, getAllTask);
router.put("/:id/complete", authentication, isUser, markAsComplete);
router.put("/:id/in-progress", authentication, isUser, markAsProgress);
router.get("/:id", authentication, isUser, getParticularTask);










module.exports = router