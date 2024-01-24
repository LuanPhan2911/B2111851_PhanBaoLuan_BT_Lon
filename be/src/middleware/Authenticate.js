const jwt = require("jsonwebtoken");
const { UnAuthenticateException } = require("../utils/exceptions/handler");
const PersonalAccessToken = require("../models/PersonalAccessToken");
const AuthService = require("../services/AuthService");

const Authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw UnAuthenticateException;
    }
    let decoded = jwt.decode(token, process.env.APP_SECRET);
    let isValidToken = await AuthService.isValidToken(token);
    if (!isValidToken) {
      throw UnAuthenticateException;
    }

    //set user
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  Authenticate,
};
