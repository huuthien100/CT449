const Products = require("../models/product");

const handleResponse = (res, success, message, results) => {
  if (success) {
    res.status(200).json({ success, message, results });
  } else {
    console.error(message);
    res.status(500).json({ success, message });
  }
};

const handlePagination = (page) => {
  const pageNumber = page * 1 || 1;
  const limit = 10;
  const skip = (pageNumber - 1) * limit;
  return { skip, limit };
};

const productControllers = {
  getAllProduct: async (req, res) => {
    const { page, createdAt, price } = req.query;
    try {
      const { skip, limit } = handlePagination(page);
      const products = await Products.find({})
        .sort({ "price.S": price || "1", createdAt: createdAt || "-1" })
        .limit(limit)
        .skip(skip);
      const totalProduct = await Products.count();
      handleResponse(res, true, "Get all products successfully", {
        data: products,
        pagination: { limit: 10, page, total: totalProduct },
      });
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  getDetailProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Products.findOne({ _id: id });
      handleResponse(res, true, "Get product details successfully", product);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  addProduct: async (req, res) => {
    try {
      const newProduct = new Products(req.body);
      const nProduct = await newProduct.save();
      handleResponse(res, true, "Add successful products", nProduct);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const updateProduct = await Products.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );
      handleResponse(res, true, "Product update successful", updateProduct);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteProduct = await Products.findOneAndDelete({ _id: id });
      handleResponse(res, true, "Successfully delete a product", deleteProduct);
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
  searchProduct: async (req, res) => {
    const { page, title } = req.query;
    try {
      const { skip, limit } = handlePagination(page);
      let products = [];
      let totalProduct = 0;
      if (title) {
        products = await Products.find({
          $text: {
            $search: title,
          },
        })
          .limit(limit)
          .skip(skip);
        totalProduct = await Products.find({
          $text: {
            $search: title,
          },
        }).count();
      } else {
        products = await Products.find({}).limit(limit).skip(skip);
        totalProduct = await Products.find({}).count();
      }

      handleResponse(res, true, "Search results", {
        data: products,
        pagination: { limit: 10, page, total: totalProduct },
      });
    } catch (error) {
      handleResponse(res, false, "Server error");
    }
  },
};

module.exports = { productControllers };
