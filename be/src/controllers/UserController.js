const User = require("../models/User");
const { FileNotFoundException } = require("../utils/exceptions/handler");
const { remove, assetPath } = require("../utils/fileStorage/upload");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");

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

      let user = await User.findByIdAndUpdate(id, req.validated, {
        returnDocument: "after",
        projection: "-password",
      });

      return res.json(
        ResponseSuccess({
          data: user,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateAvatar: async (req, res, next) => {
    try {
      let id = req.user._id;

      let user = await User.findById(id);
      if (user.avatar) {
        remove(user.avatar);
      }

      await User.findByIdAndUpdate(
        id,
        {
          avatar: assetPath(req.file?.path),
        },
        {
          returnDocument: "after",
          projection: "-password",
        }
      );

      return res.json(
        ResponseSuccess({
          message: "Update Image Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = UserController;
