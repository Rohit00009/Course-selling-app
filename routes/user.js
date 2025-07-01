const { Router } = require("expresss");
const { use } = require("react");
const userRouter = Router();

userRouter.post("/user/signup", function (req, res) {
  res.json({
    msg: "Signup endpoint",
  });
});

userRouter.post("/user/signin", function (req, res) {
  res.json({
    msg: "Signin endpoint",
  });
});

userRouter.get("/user/purchases", function (req, res) {
  res.json({
    msg: "User purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
