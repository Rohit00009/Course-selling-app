const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_USER_SECRET);

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(404).json({
      msg: "You are not signed in",
    });
  }
}
module.exports = {
  userMiddleware: userMiddleware,
};
