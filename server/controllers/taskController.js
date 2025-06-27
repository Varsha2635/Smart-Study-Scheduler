const Task = require("../models/Task");

exports.createTask = async(req,res)=>{
      try{
            //extract title and description from request bodyy
            const {title,description,status,priority,due_date,tags,user}=req.body;
            //create a new Todo Obj and insert in DB
            const task = await Task.create({title,description, status, priority, due_date, tags ,user: req.user.id});
            //send a json response with a success flag
            // res.status(200).json(
            //       {
            //             success:true,
            //             data:response,
            //             message:'Entry Created Successfully'

            //       }
            // );
            res.status(201).json(task);
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
            const task = await Task.find({user: req.user.id});

            //response
            // res.status(200)
            // .json({
            //       success:true,
            //       data:task,
            //       message:"Entire Todo Data is fetched",

            // })
            res.status(200).json(task);
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
            const task = await Task.findById({_id: id, user: req.user.id});
            //data for given ID not found
            if(!task) {
                  return res.status(404).json({
                        success:false,
                        message:"No data Found withe given Id",
                  })
            }
            //data for given ID
            //  res.status(200)
            // .json({
            //       success:true,
            //       data:task,
            //       message:`The ${id} data succesfully fetched`,

            // })
            res.status(200).json(task);
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
            //const {id} =req.params.id;
            const { id } = req.params;
            //const {title,description} = req.body;

            // const task = await Task.findOne({ _id: id, user: req.user.id });
            // if (!task) {
            //     return res.status(404).json({ message: "Task not found or not authorized" });  
            // }
            const task = await Task.findOneAndUpdate({ _id: id, user: req.user.id },
                  req.body,
                  {new: true}
            );
            if (!task) {
                return res.status(404).json({ message: "Task not found or not authorized" });  
            }

            // const updatedTask =await Task.findByIdAndUpdate(
            //       // {_id:id},
            //       // {title, description},
            //       { _id: id, user: req.user.id },
            //       req.body,
            //       {new: true}
            // );

            // res.status(200).json({
            //       success:true,
            //       data:updatedTask,
            //       message:"updated succesfully",

            // })
            res.status(200).json(task)
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

            // const task = await Task.findOne({ _id: id, user: req.user.id });
            // if (!task) {
            //     return res.status(404).json({ message: "Task not found or not authorized" });  
            // }

            // const deletedTask =await Task.findByIdAndDelete({_id: id, user: req.user.id});

            // if(!deletedTask) {
            //       return res.status(404).json({
            //             success:false,
            //             message:"Task not found",
            //       })
            // }

            const deletedTask =await Task.findOneAndDelete({_id: id, user: req.user.id});

            if(!deletedTask) {
                  return res.status(404).json({
                        success:false,
                        message:"Task not found",
                  })
            }

            // res.status(200).json({
            //       success:true,
            //       data:todo,
            //       message:"deleted succesfully",

            // })
            res.status(200).json(deletedTask);
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
