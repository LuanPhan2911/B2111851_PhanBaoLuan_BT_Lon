const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const AuthService = require("../services/AuthService");
const AuthController = {
  getUser: (req, res, next) => {
    return res.json({
      data: req.user,
    });
  },
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        throw new ApiError(400, "Password not correct");
      }
      let token = await AuthService.createToken({
        _id: user._id,
        name: user.name,
        isAdmin: user.role === "admin",
      });
      return res.json({
        data: token,
      });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      let { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new ApiError(400, "Need provide name, email, password");
      }
      let query = await User.findOne({
        email,
      });

      if (query) {
        throw new ApiError(400, "Email provided is existed");
      }

      let hashPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        name,
        email,
        password: hashPassword,
      });
      return res.json({
        message: "User Register success",
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      let token = req.token;
      await AuthService.deleteToken(token);
      return res.json({
        message: "User logout success",
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = AuthController;
