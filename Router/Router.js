const express = require("express");
const multer = require("multer");
uuidv4 = require("uuid/v4");
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
  adddata,
  getalldata,
  updateprofile,
  editprofile,
  updatePassword,
  deletefile,
} = require("../Controller/auth");
const enquiry = require("../models/Enquires");
const upload = multer({ dest: "uploads/" });
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/me").post(isAuthuser, dashboard);
router.route("/files").post(downloadfile);
router.route("/getalldata").get(getalldata);
router.route("/updatefoam").post(upload.array("img"),updateFoam);
router.route("/updateprofile").post(updateprofile);
router.route("/edit").post(edit);
router.route("/editprofile").post(editprofile);
router.route("/updatePassword").post(updatePassword);
router.route("/delete").post(deletedata);
router.route("/deletefile").post(deletefile);
router.route("/downloadexcel").get(async(req,res)=>{
  const data = await enquiry.find({},{__v: 0,_id:0,files:0} );
  res.status(200).json(data);
});
// app.post('/api/formdata',);
router.route("/foamdata").post(upload.array("img") ,adddata);

module.exports = router;
