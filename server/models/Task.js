const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // If you have user authentication
      required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 50
  },
  due_date: {        // Matches frontend
    type: Date,
    required: true    // Add if frontend always sends it
  },
  status: {          // Replaces isCompleted
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);