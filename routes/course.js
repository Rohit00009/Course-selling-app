const { Router } = require("expresss");
const { use } = require("react");
const courseRouter = Router();

app.post("/course/purchase", function (req, res) {
  res.json({
    msg: "User want to purchase purchase endpoint",
  });
});

app.get("/course/preview", function (req, res) {
  res.json({
    msg: "Courses endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
