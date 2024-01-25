const User = require("../models/User");

const UserController = {
  edit: async (req, res, next) => {
    try {
      let _id = req.user._id;
      let user = await User.findById(_id, "-password");
      return res.json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let id = req.user._id;
      let user = await User.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
        projection: "-password",
      });
      res.json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = UserController;
