const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
      // user: {
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: "User",  // If you have user authentication
      //       // required: true,
      // },
      name:{
            type:String,
            required:true,
            trim:true, //automatically removes any extra spaces
      },
      email:{
            type:String,
            required:true,
            trim:true,
      //       match: [
      //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      //   'Please enter a valid email address'
      // ]
            },
      password:{
            type:String,
            required:true,
      },
});

profileSchema.index({ email: 1 });

profileSchema.methods.toSafeObject = function() {
  const profileObject = this.toObject();
  delete profileObject.password;
  return profileObject;
};

module.exports = mongoose.model('Profile',profileSchema)