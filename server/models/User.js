const mongoose=require("mongoose");

const userSchema = new mongoose.mongoose.Schema(
      {
            name:{
                  type:String,
                  required:true,
                  trim:true, //automatically removes any extra spaces
            },
            email:{
                  type:String,
                  required:true,
                  trim:true,
            },
            password:{
                  type:String,
                  rquired:true,
            },

      }
)

module.exports = mongoose.model("user",userSchema);