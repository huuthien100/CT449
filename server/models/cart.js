const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = mongoose.Schema(
  {
    product: {
      type: Object,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    size: {
      type: String,
      enum: ["S", "M", "L"],
      required: true,
    },
    ordered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);
module.exports = mongoose.model("carts", CartSchema);
