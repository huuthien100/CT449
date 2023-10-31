import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReceiptSchema = new Schema({
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
}, {
  timestamps: true,
  strictPopulate: false,
});

export default model("receipts", ReceiptSchema);
