const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken"); 
const { options } = require("../routes/user");
require("dotenv").config();

// Signup route handler
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error while hashing password",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        // do NOT return password
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

exports.login = async(req,res) =>{
  try{
    //data fetch
    const {email, password} = req.body;
    if (!email || !password){
      return res.status(400).json({
        success:false,
        message:'Please fill all the details carefully',
      });
    }
    // check for registered user
    const user = await User.findOne({email});

    //if not registered user
    if(!user){
      return res.status(401).json({
        success:false,
        message:'User is not registered',
      })
    }

    const payload={
      email:user.email,
      id:user._id,
    }
    //verify password and genrate a JWT token
    if(await bcrypt.compare(password,user.password)){
      //password match
      let token= jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn:"2h",
        }
      );
      let userObj = user.toObject(); // make a plain JS object
      userObj.token = token;
      userObj.password = undefined;
      const options={
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }
      res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user:userObj,
        message:'User Logged in successfully'
      });

    }
    else{
      return res.status(403).json({
        success:false,
        message:'Password Incorrect'
      })
    }

  }
  catch(error){
    console.error(error);
    return res.status(500).json({
      success:false,
      message:'Login Failure',
    })
    
  }
}
