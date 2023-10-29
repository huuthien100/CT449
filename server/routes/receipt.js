const router = require("express").Router();
const { receiptControllers } = require("../controllers/receiptControllers");
const { verifyTokenAdmin } = require("../middlewares/verifyTokenAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", verifyTokenAdmin, receiptControllers.getAllReceipt);
router.post("/", verifyToken, receiptControllers.addReceipt);
router.patch("/:id", verifyTokenAdmin, receiptControllers.updateReceipt);
router.delete("/:id", verifyTokenAdmin, receiptControllers.deleteReceipt);

module.exports = router;
