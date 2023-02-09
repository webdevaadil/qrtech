const express = require("express");
const multer = require("multer");
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
  adddata,
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
router.route("/foamdata").post(upload.array("img") ,adddata);

module.exports = router;
