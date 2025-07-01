const express = require("express");
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const JWT_SECRET = "random123";
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");

const app = express();
// app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000);
