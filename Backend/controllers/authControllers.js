const Users = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const authControllers = {
  // Register
  register: async (req, res) => {
    const { fullName, phone, address, email, password } = req.body;

    try {
      // Check if email exists
      const existedUser = await Users.findOne({
        email,
      });

      if (existedUser)
        return res.status(400).json({
          message: "Email already exists",
          success: false,
        });

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      // Create and save user
      const newUser = new Users({
        fullName,
        phone,
        address,
        email,
        password: hashPass,
      });

      const user = await newUser.save();
      return res.status(200).json({
        message: "Registration successful",
        success: true,
        results: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  },

  // Login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await Users.findOne({
        email,
      });

      if (!user)
        return res.status(400).json({
          message: "Email does not exist",
          success: false,
        });

      // Check password
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword)
        return res.status(400).json({
          message: "Incorrect password!",
          success: false,
        });

      // Delete password key
      delete user._doc.password;
      const accessToken = jwt.sign({ user }, "duongthanhthong");

      // Do not send the password
      delete user._doc.password;

      return res.status(200).json({
        message: "Login successful",
        success: true,
        results: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  },

  // Update User Profile
  updateProfile: async (req, res) => {
    try {
      // Update user profile
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
        message: "Update successful",
        success: true,
        results: {
          user: updateUser,
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  },
};

module.exports = { authControllers };