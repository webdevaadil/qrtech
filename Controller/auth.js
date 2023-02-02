const catchAsyncerror = require("../middleware/catchAsyncerror");
const users = require("../models/User.js");
const emailValidator = require("deep-email-validator");
async function isEmailValid(email) {
  return emailValidator.validate(email);
}
exports.register = catchAsyncerror(async (req, res, next) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json("plese fill all input ");
  }
  if (password.length < 8) {
    return res.status(400).json("password must be 8 character long");
  }
  try {
    users.findOne({ email }, async (err, user) => {
      const { valid, reason, validators } = await isEmailValid(email);
      // console.log(validators);
      console.log(user);
      if (user) {
        return res.status(500).json("user already registered");
      } else {
        const userData = await users.create({
          email,
          password,
          name,
        });

        sendToken(userData, 201, res);
      }
      return;
    });
  } catch (error) {
    console.log(error.message);
  }
})


const sendToken = (user, statusCode, res) => {
  const token = users.getSignedToken();
  // option for cookie
  const options = {
    expire: new Date(Date.now + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};