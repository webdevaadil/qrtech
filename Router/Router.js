const express = require("express");
multer = require("multer");
uuidv4 = require("uuid/v4");
const DIR = "./public/";
const router = express.Router();
const {
  register,
  login,
  downloadfile,
  updateFoam,
  deletedata,
  edit,
  isAuthuser,
  dashboard,
} = require("../Controller/auth");
const enquiry = require("../models/Enquires");
const upload = multer({ dest: "uploads/" });
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").post(isAuthuser, dashboard);
router.route("/files").get(downloadfile);
router.route("/updatefoam").post(updateFoam);
router.route("/edit").post(edit);
router.route("/delete").post(deletedata);
router.route("/test").post(async(req,res)=>{
  console.log(req.user);
});
// app.post('/api/formdata',);
router.route("/foamdata").post(upload.array("files"), async (req, res) => {
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
  // Create a new instance of the FormData model
  const formData = new enquiry({
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
