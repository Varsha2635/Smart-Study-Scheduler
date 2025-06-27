const FocusSession = require("../models/Focus");

let activeSessions = {};  // in-memory store per user

exports.startFocusSession = (req,res) =>{
      const {task} = req.body;
      const userId = req.user.id;
      if (!task) return res.status(400).json({ message: "Task is required" });

      activeSessions[userId] = {
            task,
            startTime: new Date(),
      };

      res.json({ message: "Focus session started", task });
};

exports.stopFocusSession = async (req, res) => {
      const userId = req.user.id;
      const session = activeSessions[userId];
      if (!session) return res.status(400).json({ message: "No active session found" });

      const endTime = new Date();
      const duration = Math.floor((endTime - session.startTime) / 60000); // in minutes

      const savedSession = new FocusSession({
            user: userId,
            task: session.task,
            startTime: session.startTime,
            endTime,
            durationMinutes: duration,

      });

      await savedSession.save();
      delete activeSessions[{ user: userId }];
      res.json({ message: "Session saved", session: savedSession });

};

exports.getSessionHistory = async (req, res) => {
  const userId = req.user.id;

  const sessions = await FocusSession.find({ user: userId }).sort({ startTime: -1 });

  res.json({ success: true, data: sessions });
};

exports.getProductivityScore = async (req, res) => {
  const userId = req.user.id;

  const sessions = await FocusSession.find({ user: userId });

  const totalMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const score = Math.min(100, Math.round((totalMinutes / 300) * 100)); // assume 300 mins = full score

  res.json({ success: true, score, totalMinutes });
};

