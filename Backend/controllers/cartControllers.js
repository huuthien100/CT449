const Cart = require("../models/cart");

const handleResponse = (res, success, message, results) => {
  if (success) {
    res.status(200).json({ success, message, results });
  } else {
    console.error(message);
    res.status(500).json({ success, message });
  }
};

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

      handleResponse(res, true, "Retrieve cart successfully", carts);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  addToCart: async (req, res) => {
    const { product, quantity, size, price } = req.body;

    try {
      let cart;

      cart = await Cart.findOne({
        user: req.userId,
        "product._id": product._id,
        ordered: false,
      });

      if (cart) {
        if (cart.size === size) {
          cart = await Cart.findOneAndUpdate(
            { user: req.userId, "product._id": product._id, ordered: false },
            { quantity: cart.quantity + quantity, price },
            { new: true }
          );
        } else {
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
        const nCart = new Cart({
          product,
          user: req.userId,
          quantity,
          size,
          price,
        });
        cart = await nCart.save();
      }
      handleResponse(res, true, "Added to cart successfully", cart);
    } catch (error) {
      handleResponse(res, false, "Server error");
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

      handleResponse(res, true, "Updated cart successfully", productUpdate);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  deleteToCart: async (req, res) => {
    const { id } = req.params;
    try {
      const newData = await Cart.findOneAndDelete({ _id: id });
      handleResponse(res, true, "Deleted product successfully");
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },

  order: async (req, res) => {
    try {
      await Cart.updateMany(
        { user: req.userId, ordered: false },
        { ordered: true }
      );
      handleResponse(res, true, "Ordered successfully");
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
};

module.exports = { cartControllers };
