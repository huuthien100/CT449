const router = require("express").Router();
const { productControllers } = require("../controllers/productControllers");
const { verifyTokenAdmin } = require("../middlewares/verifyTokenAdmin");

router.get("/", productControllers.getAllProduct);
router.get("/search", productControllers.searchProduct);

router.get("/:id", productControllers.getDetailProduct);

router.post("/", verifyTokenAdmin, productControllers.addProduct);

router.patch("/:id", verifyTokenAdmin, productControllers.updateProduct);

router.delete("/:id", verifyTokenAdmin, productControllers.deleteProduct);
module.exports = router;
