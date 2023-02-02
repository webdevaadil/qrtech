const express = require('express');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookiesparser = require("cookie-parser");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const connectDB = require("./Config/db");
connectDB()
app.use(cookiesparser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api/auth", require("./Router/Router"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5000, () => {
  console.log('server is running on 5000!');
});
