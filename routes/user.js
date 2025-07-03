const bcrypt = require("bcrypt");
const { z } = require("zod");
const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
// const { UserModel } = require("../../cohort-web3/week7/db");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const signupSchema = z.object({
    //added zod validation
    email: z.string().min(3).max(100).email(),
    password: z
      .string()
      .min(3)
      .max(30)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
  });

  // let errorThrown = false;
  try {
    const { email, password, firstName, lastName } = signupSchema.parse(
      req.body
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return res.json({ msg: "Signed up successfully!" });
  } catch (e) {
    console.log("Signup Error:", e);
    return res.json({
      msg: "DUplicate user!",
      error: e.errors,
    });
    // errorThrown = true;
  }

  // if (!errorThrown) {
  //   return res.json({
  //     msg: "Signed up successfully!",
  //   });
  // }

  // res.json({
  //   msg: "Signup endpoint",
  // });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
    // password: password,
  });

  if (!user) {
    return res.status(404).json({
      msg: "user not found!",
    });
  }
  console.log("Plain Password:", password);
  console.log("Stored Hash:", user.password);

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_SECRET
    );
    return res.json({
      token,
    });
  } else {
    return res.status(404).json({
      msg: "Invalid Password!",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({ userId });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });

  res.json({
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
