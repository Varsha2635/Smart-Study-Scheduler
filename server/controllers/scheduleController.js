// const {generatePlan} = require('../services/aiScheduler');
// const Schedule = require ('../models/Schedule');


// const createSchedule = async (req, res) =>{
//   try{
//     const userId = req.user.id;
//     const { subjects, goals, examDate, availableHoursPerDay } = req.body;

//     if (!subjects || !goals || !examDate || !availableHoursPerDay){
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

    
//     const plan =  generatePlan(subjects, goals, examDate, availableHoursPerDay);

//     //save the schedule to DB
//      const schedule = new Schedule({
//       user:userId,
//       subjects,
//       goals,
//       examDate,
//       availableHoursPerDay,
//       plan,
//      });

//     await schedule.save();
//     res.status(201).json(schedule)

//   }catch(error){
//     console.error('Error creating schedule:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getUserSchedules = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const schedules = await Schedule.find({ user: userId }).sort({ createdAt: -1 });

//     res.json(schedules);
//   } catch (error) {
//     console.error('Error fetching schedules:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getScheduleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const schedule = await Schedule.findOne({ _id: id, user: userId });
//     if (!schedule) {
//       return res.status(404).json({ message: 'Schedule not found' });
//     }

//     res.json(schedule);
//   } catch (error) {
//     console.error('Error fetching schedule:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   createSchedule,
//   getUserSchedules,
//   getScheduleById,
// };

const generatePlan = require("../services/schedulerLogic");
const Schedule = require("../models/Schedule");

exports.createSchedule = async (req, res) => {
  try {
    const { availableHours, subjects } = req.body;
    const userId = req.user.id;


    if (!availableHours || !subjects || subjects.length === 0) {
      return res.status(400).json({ success: false, message: "Missing input data" });
    }

    const plan = generatePlan(availableHours, subjects);

    const schedule = new Schedule({
      user: userId,
      availableHours,
      subjects,
      plan
    });

    await schedule.save();

    res.status(201).json({
      success: true,
      schedule
    });
  } catch (error) {
    console.error("Error saving schedule:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.getUserSchedules = async (req, res) => {
  try {
    const userId = req.user.id;
    const schedules = await Schedule.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// const getUserSchedules = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const schedules = await Schedule.find({ user: userId }).sort({ createdAt: -1 });

//     res.json(schedules);
//   } catch (error) {
//     console.error('Error fetching schedules:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updateSchedule = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json({ success: true, schedule: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Update failed" });
//   }
// };

// exports.deleteSchedule = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Schedule.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Schedule deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Deletion failed" });
//   }
// };

