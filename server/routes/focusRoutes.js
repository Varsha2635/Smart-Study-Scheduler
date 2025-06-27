const express = require("express");
const router = express.Router();

const { authenticateUser } = require('../middleware/auth');

const {
  startFocusSession,
  stopFocusSession,
  getSessionHistory,
  getProductivityScore,
} = require("../controllers/focusController");


router.post("/focus/start", authenticateUser, startFocusSession);
router.post("/focus/stop", authenticateUser, stopFocusSession);
router.get("/focus/history", authenticateUser, getSessionHistory);
router.get("/focus/score", authenticateUser, getProductivityScore);

module.exports = router;