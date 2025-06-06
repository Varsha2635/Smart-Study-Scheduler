const express = require("express");
const app=express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;


// connect to database
const dbConnect= require("./config/database");
dbConnect();

//  CORS middleware (add this BEFORE routes!)
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());



//route import and mount
const user = require("./routes/user");
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/v1",user);
app.use("/api/v1",taskRoutes);

app.get("/",(req,res)=>{
      res.send("Hello VK!!");
})

//start server
app.listen(PORT,()=>{
      console.log("server started");
})