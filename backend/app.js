const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const skillRoutes = require("./routes/skill-router");
const employeeRoutes = require("./routes/employee-router");

const app = express();

mongoose
  .connect(
    'mongodb://localhost/indeavor-employee-management',{ useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use("/",express.static(path.join(__dirname,"angular")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/test", (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use("/api/skill", skillRoutes);
app.use("/api/employee", employeeRoutes);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
});

module.exports = app;