require("dotenv").config();
console.log(process.env.MONGO_URL);

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
    process.env.MONGO_URL
    //   , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  );

  app.listen(3000);
  console.log("listening on port 3000");
}

main();
