const express = require("express");
const app=express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 5000;


// connect to database
const dbConnect= require("./config/database");
dbConnect();

//  CORS middleware (add this BEFORE routes!)
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());


const cookieParser = require("cookie-parser");
app.use(cookieParser());

//route import and mount
const user = require("./routes/user");
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/v1",user);

app.use("/api/v1",taskRoutes);

const scheduleRoutes = require("./routes/scheduleRoutes");
app.use("/api/v1", scheduleRoutes);

const focusRoutes = require("./routes/focusRoutes");
app.use("/api/v1", focusRoutes);

const profileRoutes = require('./routes/profileRoutes'); // Add profile routes
app.use('/api/v1', profileRoutes); // Mount profile routes

const passwordRoutes = require('./routes/passwordRoutes');
app.use('/api/v1', passwordRoutes);


app.get("/",(req,res)=>{
      res.send("Hello VK!!");
})

//start server
app.listen(PORT,()=>{
      console.log("server started");
})