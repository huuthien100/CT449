const Receipts = require("../models/receipt");

const handleResponse = (res, success, message, results) => {
  if (success) {
    res.status(200).json({ success, message, results });
  } else {
    console.error(message);
    res.status(500).json({ success, message });
  }
};

const receiptControllers = {
  getAllReceipt: async (req, res) => {
    try {
      const receipts = await Receipts.find({}).populate("user");
      handleResponse(res, true, "Retrieve all receipts successfully", receipts);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },

  addReceipt: async (req, res) => {
    try {
      const newReceipt = new Receipts({
        user: req.userId,
        carts: req.body.carts,
      });
      const nReceipt = await newReceipt.save();
      handleResponse(res, true, "Receipt added successfully", nReceipt);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },

  updateReceipt: async (req, res) => {
    try {
      const { id } = req.params;
      const updateProduct = await Receipts.findOneAndUpdate(
        { _id: id },
        { checked: true },
        { new: true }
      );
      handleResponse(res, true, "Order confirmed successfully", updateProduct);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },

  deleteReceipt: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReceipt = await Receipts.findOneAndDelete({ _id: id });
      handleResponse(res, true, "Order deleted successfully", deletedReceipt);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
};

module.exports = { receiptControllers };
