const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB =  () => {
   mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("connected");
}).catch((error)=>{
    console.log(error);
})
};


module.exports = connectDB;










