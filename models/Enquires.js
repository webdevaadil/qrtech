const mongoose = require("mongoose");

const enquireschema = new mongoose.Schema({
  customer: {
    type: String,
    // required: true,
  },
  Product_type: {
    type: String,
    // required: true,
  },
  PTI_No: {
    type: String,
    // required: true,
  },
  SONo_JobNo: {
    type: String,
    // required: true,
  },
  Product_Name: {
    type: String,
    // required: true,
  },
  Constructiontype: {
    type: String,
    // required: true,
  },
  Rating: {
    type: String,
    // required: true,
  },
  DispatchDate: {
    type: Date,
    // required: true,
  },

  files: [
    {
      originalname: String,
      path: String,
    },
  ],
});
const enquiry = mongoose.model("Enquires", enquireschema);
module.exports = enquiry;
