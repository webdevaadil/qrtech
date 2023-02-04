const express = require("express");
multer = require("multer");
uuidv4 = require("uuid/v4");
const DIR = "./public/";
const router = express.Router();
const { register, login, uploaddata, downloadfile } = require("../Controller/auth");
const enquiry = require("../models/Enquires");
const upload = multer({ dest: "uploads/" });
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/files").get(downloadfile);
// app.post('/api/formdata',);
router.route("/foamdata").post(upload.array("files"), async (req, res) => {
  console.log("test");
  // Create a new instance of the FormData model
  const formData = new enquiry({
    name: req.body.name,
    email: req.body.email,
    files: req.files.map((file) => ({
      originalname: file.originalname,
      path: file.path,
    })),
  });

  // Save the form data to the database
  try {
    await formData.save();
    res
      .status(200)
      .json({ message: "Form data and files uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
