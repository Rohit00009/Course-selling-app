const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db");

courseRouter.post("/purchase", function (req, res) {
  res.json({
    msg: "User want to purchase purchase endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    msg: "Courses endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
