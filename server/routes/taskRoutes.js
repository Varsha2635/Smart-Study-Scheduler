const express = require("express");
const router = express.Router();


//import controller
const {createTask,
getTask,
getTaskById,
updateTask,
deleteTask} = require("../controllers/taskController");
const { authenticateUser } = require('../middleware/auth');

router.post("/tasks",authenticateUser, createTask);
router.get("/tasks",authenticateUser, getTask);
router.get("/tasks/:id", authenticateUser, getTaskById);
router.put("/tasks/:id", authenticateUser, updateTask);
router.delete("/tasks/:id", authenticateUser, deleteTask);


module.exports=router;
