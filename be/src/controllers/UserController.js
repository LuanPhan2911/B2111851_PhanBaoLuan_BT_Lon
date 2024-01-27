const User = require("../models/User");
const RentingBook = require("../models/RentingBook");
const { remove, assetPath } = require("../utils/fileStorage/upload");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const moment = require("moment");
const Book = require("../models/Book");

const UserController = {
  rentBook: async (req, res, next) => {
    try {
      let { _id: user_id } = req.user;
      let { expire_at } = req.body;
      let { _id: book_id } = req.body.book;

      let rentingBook = await RentingBook.create({
        book: book_id,
        user: user_id,
        expire_at: moment().add(expire_at, "days"),
      });

      await Book.findByIdAndUpdate(book_id, {
        $inc: {
          remain_quantity: -1,
        },
      });

      return res.json(
        ResponseSuccess({
          data: rentingBook,
          message: "Renting Book Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
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
