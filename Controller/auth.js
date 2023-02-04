const catchAsyncerror = require("../middleware/catchAsyncerror");
const Users = require("../models/User.js");
const Enquires = require("../models/Enquires.js");
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
    console.log(process.env.JWT_SECRET);

    Users.findOne({ email }, async (err, user) => {
      const { valid, reason, validators } = await isEmailValid(email);
      if (user) {
        return res.status(500).json("user already registered");
      } else {
        const userData = await Users.create({
          email,
          password,
          name,
        });
        console.log(userData);
        sendToken(userData, 201, res);
      }
      return;
    });
  } catch (error) {
    console.log(error.message);
  }
});

exports.login = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("plese fill all input ");
    }

    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(500).json("invalid credentials user not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("password is not valid please register");
    }

    sendToken(user, 200, res);
  } catch (error) {
    throw new Error(error);
  }
});

exports.downloadfile= catchAsyncerror(async(req,res,next)=>{
  console.log(req.params);
  const formData = await Enquires.findOne();

  // Check if the form data exists
  if (!formData) {
    return res.status(404).json({ message: 'Form data not found' });
  }

  // Find the file in the form data
  const file = formData.files.find(f => f.originalname === req.body.files);

  // Check if the file exists
  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Serve the file
  res.download(path.join(__dirname, 'uploads', file.path), file.originalname);
})
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
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
