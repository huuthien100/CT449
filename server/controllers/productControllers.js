const Products = require("../models/product");
// const cloudinary = require("cloudinary");

const productControllers = {
  getAllProduct: async (req, res) => {
    const { page } = req.query;
    const { createdAt, price } = req.query; // Handle sort
    try {
      // Pagination
      const pageNumber = page * 1 || 1;
      const limit = 15;
      const skip = (pageNumber - 1) * limit;
      // Products
      const products = await Products.find({})
        .sort({
          "price.S": price || "1",
          createdAt: createdAt || "-1",
        })
        .limit(limit)
        .skip(skip);
      const totalProduct = await Products.count();
      return res.status(200).json({
        success: true,
        message: "Lấy tất cả sản phẩm thành công",
        results: {
          data: products,
          pagination: {
            limit: 15,
            page: pageNumber,
            total: totalProduct,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
  getDetailProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findOne({ _id: id });

      return res.status(200).json({
        success: true,
        message: "Lấy chi tiết sản phẩm thành công",
        results: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
  addProduct: async (req, res) => {
    try {
      // Add product
      const newProduct = new Products(req.body);
      const nProduct = await newProduct.save();

      return res.status(200).json({
        success: true,
        message: "Thêm sản phẩm thành công",
        results: nProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Update new product
      const updateProduct = await Products.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công",
        results: updateProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      // Delete Topic
      const deleteProduct = await Products.findOneAndDelete({
        _id: id,
      });

      return res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công",
        results: deleteProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
  searchProduct: async (req, res) => {
    const { page, title } = req.query;
    try {
      // Pagination
      const pageNumber = page * 1 || 1;
      const limit = 15;
      const skip = (pageNumber - 1) * limit;
      let products = [];
      let totalProduct = 0;
      if (title) {
        // Products
        products = await Products.find({
          $text: {
            $search: title,
          },
        })
          .limit(limit)
          .skip(skip);

        // Quantity
        totalProduct = await Products.find({
          $text: {
            $search: title,
          },
        }).count();
      } else {
        // Products
        products = await Products.find({}).limit(limit).skip(skip);

        // Quantity
        totalProduct = await Products.find({}).count();
      }

      return res.status(200).json({
        success: true,
        results: {
          data: products,
          pagination: {
            limit: 15,
            page: pageNumber,
            total: totalProduct,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server erorr",
      });
    }
  },
};

module.exports = { productControllers };
