const Task = require("../models/Task");

exports.createTask = async(req,res)=>{
      try{
            //extract title and description from request bodyy
            const {title,description}=req.body;
            //create a new Todo Obj and insert in DB
            const response = await Task.create({title,description});
            //send a json response with a success flag
            res.status(200).json(
                  {
                        success:true,
                        data:response,
                        message:'Entry Created Successfully'

                  }
            );
      }
      catch(err){
            console.error(err);
            console.log(err);
            res.status(500)
            .json({
                  success:false,
                  data:"internal server error",
                  message:err.message,
            })
      }
};

exports.getTask = async(req,res)=>{
      try{
            //fetch all todo items form database
            const task = await Task.find({});

            //response
            res.status(200)
            .json({
                  success:true,
                  data:task,
                  message:"Entire Todo Data is fetched",

            })
      }
      catch(err){
            console.error(err);
            console.log(err);
            res.status(500)
            .json({
                  success:false,
                  data:"internal server error",
                  message:err.message,
            })
      }
};


exports.getTaskById = async(req,res)=>{
      try{
            const id=req.params.id;
            //extract todo items based on ID:
            const task = await Task.findById({_id: id});
            //data for given ID not found
            if(!task) {
                  return res.status(404).json({
                        success:false,
                        message:"No data Found withe given Id",
                  })
            }
            //data for given ID
             res.status(200)
            .json({
                  success:true,
                  data:task,
                  message:`The ${id} data succesfully fetched`,

            })
      }
      catch(err){
            console.error(err);
            console.log(err);
            res.status(500)
            .json({
                  success:false,
                  data:"internal server error",
                  message:err.message,
            })
      }
};

exports.updateTask = async(req,res)=>{
      try{
            const id=req.params.id;
            const {title,description} = req.body;

            const updatedTask =await Task.findByIdAndUpdate(
                  {_id:id},
                  {title, description},
            )

            res.status(200).json({
                  success:true,
                  data:updatedTask,
                  message:"updated succesfully",

            })
      }
      catch(err){
            console.error(err);
            console.log(err);
            res.status(500)
            .json({
                  success:false,
                  data:"internal server error",
                  message:err.message,
            })
      }
};

exports.deleteTask = async(req,res)=>{
      try{
            const id=req.params.id;
            const deletedTask =await Task.findByIdAndDelete({_id: id});

            if(!deletedTask) {
                  return res.status(404).json({
                        success:false,
                        message:"Task not found",
                  })
            }

            res.status(200).json({
                  success:true,
                  data:todo,
                  message:"deleted succesfully",

            })
      }
      catch(err){
            console.error(err);
            console.log(err);
            res.status(500)
            .json({
                  success:false,
                  data:"internal server error",
                  message:err.message,
            })
      }
}
