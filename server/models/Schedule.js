//const mongoose = require("mongoose");

// const scheduleSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",  // If you have user authentication
//     required: true,
//   },
//   subjects: [
//     {
//       type: [String],
//       required: true,  // Estimated hours to complete the subject
//     },
//   ],
//   goals: {
//     type: String,
//     required: true,
//   },
//   examDate: {
//     type: Date,
//     required: true,
//   },
//   availableHoursPerDay: {
//     type: Number,
//     required: true,
//   },
//   plan: {
//     type:String,
//   }
// },{
//   timestamps: true,
// });

//module.exports = mongoose.model("Schedule", scheduleSchema);


const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Optional, only if you're using user accounts
  },
  availableHours: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      name: { type: String, required: true },
      examDate: { type: Date, required: true },
    }
  ],
  plan: [
    {
      date: { type: String, required: true },  // e.g., "2025-06-08"
      subject: { type: String, required: true },
      hours: { type: Number, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Schedule", scheduleSchema);
