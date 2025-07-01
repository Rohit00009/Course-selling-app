const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json({
    msg: "Signup endpoint",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    msg: "Signin endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    msg: "User purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
