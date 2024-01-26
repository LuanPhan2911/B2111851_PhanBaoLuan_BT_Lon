const User = require("../models/User");
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
      let userUpdate = null;
      if (!req.file) {
        userUpdate = await User.findByIdAndUpdate(id, req.body, {
          returnDocument: "after",
          projection: "-password",
        });
      } else {
        let user = await User.findById(id);
        if (user.avatar) {
          remove(user.avatar);
        }

        req.body.avatar = assetPath(req.file?.path);
        userUpdate = await User.findByIdAndUpdate(id, req.body, {
          returnDocument: "after",
          projection: "-password",
        });
      }

      return res.json(
        ResponseSuccess({
          data: userUpdate,
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = UserController;
