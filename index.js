const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "random123";

const app = express();
app.use(express.json());

function auth(req, res, next) {}

app.post("/user/signup", function (req, res) {
  res.json({
    msg: "Signup endpoint",
  });
});

app.post("/user/signin", function (req, res) {
  res.json({
    msg: "Signin endpoint",
  });
});

app.get("/user/purchases", function (req, res) {
  res.json({
    msg: "User purchases endpoint",
  });
});

app.post("/course/purchase", function (req, res) {
  res.json({
    msg: "User want to purchase purchase endpoint",
  });
});

app.get("/courses", function (req, res) {
  res.json({
    msg: "Courses endpoint",
  });
});

app.listen(3000);
