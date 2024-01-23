const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PersonalAccessToken = require("../models/PersonalAccessToken");
const moment = require("moment");
const AuthController = {
  getUser: (req, res, next) => {
    try {
      let user = req.user;
      return res.json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw new ApiError(400, "Need provide  email, password");
      }
      let query = await User.findOne({
        email,
      });
      if (!query) {
        throw new ApiError(400, "User not found");
      }
      let user = query.toObject();
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        throw new ApiError(400, "Password not correct");
      }
      delete user["password"];
      let token = jwt.sign(user, process.env.APP_SECRET, {
        expiresIn: "7d",
      });

      await PersonalAccessToken.create({
        user: user._id,
        token: token,
        expired: moment().add(7, "days"),
      });

      return res.json({
        data: user,
        token: token,
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

      if (!query) {
        let hashPassword = await bcrypt.hash(password, 10);
        let user = await User.create({
          name,
          email,
          password: hashPassword,
        });
        user = user.toObject();
        delete user["password"];
        return res.json({
          data: user,
        });
      } else {
        throw new ApiError(400, "Email provided is existed");
      }
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      await PersonalAccessToken.findOneAndDelete({
        token: token,
      });
      return res.json({
        message: "User logout success",
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = AuthController;
