const jwt = require("jsonwebtoken");
const {
  UnAuthenticateException,
  InvalidTokenException,
} = require("../utils/exceptions/handler");
const PersonalAccessToken = require("../models/PersonalAccessToken");

const Authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw UnAuthenticateException;
    }
    let decoded = jwt.decode(token, process.env.APP_SECRET);
    let accessToken = await PersonalAccessToken.findOne({
      token: token,
      expired: {
        $gte: new Date(),
      },
    });
    if (!accessToken) {
      throw UnAuthenticateException;
    }

    //set user
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  Authenticate,
};
