const express = require("express");
const router = express.Router();

//import controller
const {createTask,
getTask,
getTaskById,
updateTask,
deleteTask} = require("../controllers/taskController");

router.post("/createTask",createTask);
router.get("/getTask",getTask);
router.get("/getTask/:id",getTaskById);
router.put("/updateTask/:id",updateTask);
router.delete("/deleteTask/:id",deleteTask);


module.exports=router;
