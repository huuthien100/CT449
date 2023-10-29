const Cart = require("../models/cart");
// const cloudinary = require("cloudinary");

const cartControllers = {
  getCart: async (req, res) => {
    try {
      const carts = await Cart.find({
        user: req.userId,
      }).populate("user", [
        "fullName",
        "phone",
        "address",
        "email",
        "createdAt",
      ]);

      return res.status(200).json({
        success: true,
        results: carts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
  addToCart: async (req, res) => {
    const { product, quantity, size, price } = req.body;

    try {
      // Data
      let cart;

      // Check exist => update data
      cart = await Cart.findOne({
        user: req.userId,
        "product._id": product._id,
        ordered: false,
      });

      if (cart) {
        // Check old size
        // Case 1: Same size -> update again quantity, price
        // Case 2: Different size -> create new cart

        // Case 1
        if (cart.size === size) {
          cart = await Cart.findOneAndUpdate(
            { user: req.userId, "product._id": product._id, ordered: false },
            { quantity: cart.quantity + quantity, price },
            { new: true }
          );
        } else {
          // Case 2
          const nCart = new Cart({
            product,
            user: req.userId,
            quantity,
            size,
            price,
          });
          cart = await nCart.save();
        }
      } else {
        // Add product to cart
        const nCart = new Cart({
          product,
          user: req.userId,
          quantity,
          size,
          price,
        });
        cart = await nCart.save();
      }
      return res.status(200).json({
        success: true,
        message: "Thêm vào giõ hàng thành công",
        results: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },

  editToCart: async (req, res) => {
    const { quantity } = req.body;

    try {
      const productUpdate = await Cart.findOneAndUpdate(
        { _id: req.params.id },
        {
          quantity,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Cập nhật giõ hàng thành công",
        results: productUpdate,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },
  deleteToCart: async (req, res) => {
    const { id } = req.params;
    try {
      const newData = await Cart.findOneAndDelete({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error!",
      });
    }
  },

  order: async (req, res) => {
    try {
      await Cart.updateMany(
        { user: req.userId, ordered: false },
        { ordered: true }
      );
      return res.status(200).json({
        success: true,
        message: "Đặt hàng thành công",
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

module.exports = { cartControllers };
