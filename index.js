const express = require('express');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookiesparser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
const connectDB = require("./Config/db");
connectDB()
app.use(cookiesparser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/auth", require("./Router/Router"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5000, () => {
  console.log('server is running on 5000!');
});
