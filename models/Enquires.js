const mongoose = require("mongoose");

const enquireschema = new mongoose.Schema({
  customer: {
    type: String,
  
  },
  Product_type: {
    type: String,
  
  },
  PTI_No: {
    type: String,
  
  },
  SONo_JobNo:{
    type: String,
  
  },
  Panel_name:{
    type: String,
  
  },
  Constructiontype:{
    type: String,
  
  },
  Rating:{
      type: Number,
    
    },
    Upload_Files:{
      type: String,
    
    },
    DispatchDate:{
      type: Date,
    
    },
    files: [{
      originalname: String,
      path: String
    }]
});
const enquiry =mongoose.model("Enquires",enquireschema);
module.exports= enquiry