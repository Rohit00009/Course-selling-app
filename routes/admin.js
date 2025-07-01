const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signin", function (req, res) {
  res.json({
    msg: "admin signin endpoint",
  });
});

adminRouter.post("/signup", function (req, res) {
  res.json({
    msg: "admin signup endpoint",
  });
});

adminRouter.post("/course/add", function (req, res) {
  res.json({
    msg: "admin course creation endpoint",
  });
});

adminRouter.post("/course/delete", function (req, res) {
  res.json({
    msg: "admin course deletion endpoint",
  });
});

adminRouter.put("/course/change", function (req, res) {
  res.json({
    msg: "admin course updates endpoint",
  });
});

adminRouter.post("/course/bulk", function (req, res) {
  res.json({
    msg: "admin course content addition endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
