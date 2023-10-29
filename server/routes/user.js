const { authControllers } = require("../controllers/authControllers");
const { verifyToken } = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/", verifyToken, authControllers.updateProfile);

module.exports = router;
