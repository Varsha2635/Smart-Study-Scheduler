const bcrypt = require('bcrypt')

const User = require('../models/User')

exports.forgotPassword = async(req,res) => {
      const { email } = req.body;
      try{
            const user = await User.findOne({email});
            if(!user){
                  return res.status(404).json({ 
                        success: false, 
                        message: "User not found" 
                  });
            }
            return res.status(200).json({ success: true, message: "Email found. You can reset your password." });
      } catch(error){
            console.error("Forgot Password error:", error);
            return res.status(500).json({
                  success:false,
                  message:'Internal server Error'
            });
            
      }
}

exports.resetPassword = async(req,res) =>{
     const { email, newPassword, confirmPassword } = req.body;
     if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
     }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ 
      success: false, 
      message: "User not found" 
    });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: "Password reset successfully" 
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to reset password" 
   });
  }
}