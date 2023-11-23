const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  try {
    const decoded = jwt.verify(token, "");
    req.userId = decoded.user._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { verifyToken };