const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceiptSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    carts: {
      type: Array,
      default: [],
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);
module.exports = mongoose.model("receipts", ReceiptSchema);
