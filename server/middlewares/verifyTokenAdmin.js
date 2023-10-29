const jwt = require("jsonwebtoken");
const verifyTokenAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Bạn chưa đăng nhập",
    });
  }
  try {
    const decoded = jwt.verify(token, "duongthanhthong");

    if (decoded.user.role === "ADMIN") return next();
    return res.status(400).json({
      success: false,
      message: "Bạn không đủ quyền",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Token không hợp lệ",
    });
  }
};

module.exports = { verifyTokenAdmin };
