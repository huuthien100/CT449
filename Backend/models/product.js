const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Object,
      default: {
        S: 100000,
        M: 120000,
        L: 150000,
        XL: 180000,
        XXL: 200000,
      },
    },
    size: {
      type: Array,
      default: ["S", "M", "L", "XL", "XXL"]
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ title: "text" });

const Products = mongoose.model("products", ProductSchema);

if (!Products.collection.indexExists({ title: "text" })) {
  Products.createIndex({ title: "text" });
}

module.exports = Products;
