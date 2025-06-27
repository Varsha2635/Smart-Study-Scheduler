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
                  required:true,
            },

      }
)

userSchema.index({ email: 1 });

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("user",userSchema);