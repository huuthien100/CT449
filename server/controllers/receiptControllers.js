const Receipts = require("../models/receipt");

const receiptControllers = {
  getAllReceipt: async (req, res) => {
    try {
      const receipts = await Receipts.find({}).populate("user");
      return res.status(200).json({
        success: true,
        message: "Lấy tất cả đơn hàng thành công",
        results: receipts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },

  addReceipt: async (req, res) => {
    try {
      // Add product
      const newReceipt = new Receipts({
        user: req.userId,
        carts: req.body.carts,
      });
      const nReceipt = await newReceipt.save();
      return res.status(200).json({
        success: true,
        message: "Thêm đơn hàng thành công",
        results: nReceipt,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },
  updateReceipt: async (req, res) => {
    try {
      const { id } = req.params;

      // Update new product
      const updateProduct = await Receipts.findOneAndUpdate(
        { _id: id },
        {
          checked: true,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        message: "Xác nhận đơn hàng thành công",
        results: updateProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },

  deleteReceipt: async (req, res) => {
    try {
      const { id } = req.params;

      // Update new product
      const updateProduct = await Receipts.findOneAndDelete({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Xóa đơn hàng thành công",
        results: updateProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },
};

module.exports = { receiptControllers };
