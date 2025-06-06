const mongoose= require("mongoose");

const taskSchema = new mongoose.Schema({
      title:{
            type:String,
            required:true
      },
      description:{
            type:String,
            required:true,
            maxLength:50,
      },
      dueDate:Date,
      priority:{
            type:String,
            enum:['low','medium','high'],
            default:'low'
      },
      tags:[String],
      isCompleted:{
            type:Boolean,
            default:false
      }
},
{
      timestamps:true
});

module.exports = mongoose.model("Task",taskSchema);