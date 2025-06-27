// const express = require('express');
// const router = express.Router();
// const { authenticateUser } = require('../middleware/auth');

// const {
//   createSchedule,
//   getUserSchedules,
//   getScheduleById,
// } = require('../controllers/scheduleController');

// router.post("/schedule", authenticateUser, createSchedule); // Create new schedule
// router.get("/schedule", authenticateUser, getUserSchedules); // View saved schedules
// router.get('/schedule/:id', authenticateUser, getScheduleById);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createSchedule,
  getUserSchedules,
  updateSchedule,
  deleteSchedule
} = require("../controllers/scheduleController");

const { authenticateUser } = require('../middleware/auth');

router.post("/schedule/create", authenticateUser, createSchedule);
router.get("/schedule", authenticateUser, getUserSchedules);
// router.put("/schedule/:id", authenticateUser, updateSchedule);
// router.delete("/schedule/:id", authenticateUser, deleteSchedule);
module.exports = router;


