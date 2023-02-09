const catchAsyncerror = require("../middleware/catchAsyncerror");
const Users = require("../models/User.js");
const Enquires = require("../models/Enquires.js");
const emailValidator = require("deep-email-validator");
const path = require("path");
const jwt = require("jsonwebtoken");
const enquiry = require("../models/Enquires.js");

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
  console.log(req.body);
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
      return res.status(500).json("password is not valid ");
    }

    sendToken(user, 200, res, req);
  } catch (error) {
    throw new Error(error);
  }
});

exports.downloadfile = catchAsyncerror(async (req, res, next) => {
  console.log(req.params);
  const formData = await Enquires.findById("63de5f13f7a59c3e94cb9fb9");
  console.log(formData);
  // Check if the form data exists
  if (!formData) {
    return res.status(404).json({ message: "Form data not found" });
  }

  // Find the file in the form data
  const file = formData.files.find((f) => f.originalname === req.body.files);

  // Check if the file exists
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }
  // Serve the file
  res.download(path.join(__dirname, "..", file.path), file.originalname);
});
exports.updateFoam = catchAsyncerror(async (req, res, next) => {
  const {
    customer,
    Product_type,
    PTI_No,
    SONo_JobNo,
    Panel_name,
    Constructiontype,
    Rating,
    DispatchDate,
  } = req.body;
  const newUserData = {
    customer,
    Product_type,
    PTI_No,
    SONo_JobNo,
    Panel_name,
    Constructiontype,
    Rating,
    DispatchDate,
    files: req.files.map((file) => ({
      originalname: file.originalname,
      path: file.path,
    })),
  };

  await Enquires.findByIdAndUpdate(req.body._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: "updated",
  });
});
exports.edit = catchAsyncerror(async (req, res) => {
  let uid = req.body.id;
  // console.log(req);
  let data = await Enquires.findById({ _id: uid });
  // console.log(data);
  return res.json(data);
});
exports.deletedata = catchAsyncerror(async (req, res) => {
  let uid = req.body.id;
  // console.log(req);
  let data = await Enquires.findByIdAndDelete({ _id: uid });
  // console.log(data);
  return res.json(data);
});
exports.isAuthuser = catchAsyncerror(async (req, res, next) => {
  const { token } = req.body;
  console.log(req.body);
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  } else {
    console.log("dd");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decodedData.id);
    console.log(req.user);
    next();
  }
});
exports.adddata = catchAsyncerror(async (req, res, next) => {

console.log(req.files);
const obj = JSON.parse(JSON.stringify(req.body))
const {
  customer,
  Product_type,
  PTI_No,
  SONo_JobNo,
  Panel_name,
  Constructiontype,
  Rating,
  DispatchDate,
  
} = obj;
console.log(Panel_name);
    // Create a new instance of the FormData model
    try {
   await enquiry.create({
       customer,
       Product_type,
       PTI_No,
       SONo_JobNo,
       Panel_name,
       Constructiontype,
       Rating,
       DispatchDate,
       files: req.files.map((file) => ({
        originalname: file.originalname,
        path: file.path,
      })),
      
    });
  
    // Save the form data to the database
      
      res
        .status(200)
        .json({ message: "Form data and files uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  
});
exports.dashboard = catchAsyncerror(async (req, res, next) => {

  if (!req.user) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  }
console.log(req.user.id,"555");
  const user = await Users.findById(req.user.id);



  res.status(200).json({
    sucess: true,
    user,
  });
});
const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  // option for cookie
  console.log(token);
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
