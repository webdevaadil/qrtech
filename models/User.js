const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsyncerror = require("../middleware/catchAsyncerror");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
 
  telephone: {
    type: String,
  },
  profilepic: {
    type: String,
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


userSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
 userSchema.methods.getResetPasswordToken = function(){

//genrating token

const resetToken = crypto.randomBytes(20).toString("hex")


//hashing and adding resetPassword token to user schema
this.resetPasswordToken = crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");

this.resetPasswordExpire  = Date.now()+ 15 *60 *1000;
return resetToken;

 };
const user = mongoose.model("qrlogin", userSchema);
module.exports = user;
