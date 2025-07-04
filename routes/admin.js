const bcrypt = require("bcrypt");
const { z } = require("zod");
const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
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

    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return res.json({ msg: "Signed up successfully!" });
  } catch (e) {
    console.log("Signup Error:", e);
    return res.json({
      msg: "DUplicate admin!",
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

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email,
    // password: password,
  });

  if (!admin) {
    return res.status(404).json({
      msg: "admin not found!",
    });
  }
  console.log("Plain Password:", password);
  console.log("Stored Hash:", admin.password);

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_SECRET
    );
    return res.json({
      token,
    });
  } else {
    return res.status(404).json({
      msg: "Invalid Password!",
    });
  }
  res.json({
    msg: "admin signup endpoint",
  });
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });
  res.json({
    msg: "Course Created",
    courseId: course._id,
  });
});

adminRouter.put("/change", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  try {
    const updatedCourse = await courseModel.findOneAndUpdate(
      {
        _id: courseId,
        creatorId: adminId, // ensures only creator can update
      },
      {
        title,
        description,
        imageUrl,
        price,
      },
      {
        new: true, // return the updated document
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({ msg: "Course not found or unauthorized" });
    }

    res.json({
      msg: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ msg: "Something went wrong", error });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    msg: "Course list",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
