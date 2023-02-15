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
exports.getalldata = catchAsyncerror(async (req, res, next) => {
  const data = await Enquires.find();
  res.status(200).json(data);
});

exports.downloadfile = catchAsyncerror(async (req, res, next) => {
  console.log(req.body);
  const formData = await Enquires.findById({ _id: req.body.id });
  console.log(formData);
  // Check if the form data exists
  if (!formData) {
    return res.status(404).json({ message: "Form data not found" });
  }

  // Find the file in the form data
  const file = formData.files.find((f) => f.originalname === req.body.e);

  // Check if the file exists
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }
  console.log(path.join(__dirname, "..", file.path), file.originalname);
  // Serve the file
  return res.download(path.join(__dirname, "..", file.path));
});
exports.updateFoam = catchAsyncerror(async (req, res, next) => {
  console.log(req.files);
  const obj = JSON.parse(JSON.stringify(req.body));
  console.log(req.body);
  try {
    const {
      customer,
      Product_type,
      PTI_No,
      SONo_JobNo,
      Panel_name,
      Constructiontype,
      Rating,
      DispatchDate,
      _id,
    } = obj;
    console.log(obj);

    const oldimg = await Enquires.findById(_id);
    let a = req.files.map((file) => ({
      originalname: file.originalname,
      path: file.path,
    }));
    console.log(a, "a");
    let newarr = oldimg.files.concat(a);
    console.log(newarr);
    const newUserData = {
      customer,
      Product_type,
      PTI_No,
      SONo_JobNo,
      Panel_name,
      Constructiontype,
      Rating,
      DispatchDate,
      files: newarr,
    };
    await Enquires.findByIdAndUpdate(obj._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: "updated",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});
exports.updateprofile = catchAsyncerror(async (req, res, next) => {
  try {
    const { firstname, lastname, email, telephone, profilepic, _id } = req.body;
    const newUserData = {
      firstname,
      lastname,
      email,
      telephone,
      profilepic,
    };
    const data = await Users.findByIdAndUpdate(_id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: "updated",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});
exports.edit = catchAsyncerror(async (req, res) => {
  let uid = req.body.id;
  let data = await Enquires.findById({ _id: uid });
  // console.log(data);
  return res.json(data);
});
exports.editprofile = catchAsyncerror(async (req, res) => {
  let uid = req.body.id;
  let data = await Users.findById({ _id: uid });
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
exports.deletefile = catchAsyncerror(async (req, res) => {
  let uid = req.body.id;
  let path = req.body.e;
  console.log(req.body);
  const fs = require("fs");
  
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    //file removed
  });
  const data =  await Enquires.update(
    { '_id': (uid) }, 
    { $pull: { files: { path:path } } })
    console.log(data);
});

exports.adddata = catchAsyncerror(async (req, res, next) => {
  console.log(req.files);

  const obj = JSON.parse(JSON.stringify(req.body));
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
  
  console.log(obj);
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
exports.isAuthuser = catchAsyncerror(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  } else {
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decodedData.id);
      next();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
});
exports.dashboard = catchAsyncerror(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  }

  const user = await Users.findById(req.user.id);

  res.status(200).json({
    sucess: true,
    user,
  });
});
exports.updatePassword = catchAsyncerror(async (req, res, next) => {
  const user = await Users.findById(req.body.user._id).select("+password");
  // console.log(req.body);
  const isPasswordMatched = await user.matchPassword(req.body.data.password);
  if (req.body.data.newpassword.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be 8 character long" });
  }
  if (req.body.data.confirmPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be 8 character long" });
  }
  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({ message: "password does not match" });
  }

  user.password = req.body.data.newpassword;

  await user.save();

  sendToken(user, 200, res);
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
