const Users = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const authControllers = {
  // Register
  register: async (req, res) => {
    const { fullName, phone, address, email, password } = req.body;

    try {
      // Check email exist
      const existedUser = await Users.findOne({
        email,
      });

      if (existedUser)
        return res.status(400).json({
          message: "Email đã tồn tại",
          success: false,
        });

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      // Create + Save user
      const newUser = new Users({
        fullName,
        phone,
        address,
        email,
        password: hashPass,
      });

      const user = await newUser.save();
      return res.status(200).json({
        message: "Đăng kí thành công",
        success: true,
        results: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server erorr",
        success: false,
      });
    }
  },

  // Login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check user exist
      const user = await Users.findOne({
        email,
      });

      if (!user)
        return res.status(400).json({
          message: "Email không tồn tại",
          success: false,
        });

      // Check passowrd
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword)
        return res.status(400).json({
          message: "Mật khẩu không chính xác!",
          success: false,
        });

      // Delete password key
      delete user._doc.password;
      const accessToken = jwt.sign({ user }, "duongthanhthong");

      // Not send password
      delete user._doc.password;

      return res.status(200).json({
        message: "Đăng nhập thành công",
        success: true,
        results: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server erorr",
        success: false,
      });
    }
  },

  // Update profife User
  updateProfile: async (req, res) => {
    try {
      // Update new product
      const updateUser = await Users.findOneAndUpdate(
        { _id: req.userId },
        req.body,
        {
          new: true,
        }
      );

      delete updateUser._doc.password;
      const accessToken = jwt.sign({ user: updateUser }, "duongthanhthong");
      return res.status(200).json({
        message: "Cập nhật thành công",
        success: true,
        results: {
          user: updateUser,
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server erorr",
        success: false,
      });
    }
  },
};

module.exports = { authControllers };
