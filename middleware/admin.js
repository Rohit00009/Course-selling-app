const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
