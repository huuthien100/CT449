const router = require("express").Router();
const { cartControllers } = require("../controllers/cartControllers");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyTokenAdmin } = require("../middlewares/verifyTokenAdmin");

router.get("/", verifyToken, cartControllers.getCart);
router.post("/", verifyToken, cartControllers.addToCart);
router.get("/order", verifyToken, cartControllers.order);
router.patch("/:id", verifyToken, cartControllers.editToCart);
router.delete("/:id", verifyToken, cartControllers.deleteToCart);

module.exports = router;
