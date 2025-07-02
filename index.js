const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "random123";
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:5hURWwyBDvxuTikf@cluster0.cm424xg.mongodb.net/coursera-app"
  );

  app.listen(3000);
  console.log("listening on port 3000");
}

main();
