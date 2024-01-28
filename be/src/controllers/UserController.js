const User = require("../models/User");
const RentingBook = require("../models/RentingBook");
const { remove, assetPath } = require("../utils/fileStorage/upload");
const {
  ResponseSuccess,
  ResponseFailure,
} = require("../utils/responses/JsonResponse");
const moment = require("moment");
const Book = require("../models/Book");
const RentingBookService = require("../services/RentingBookService");

const UserController = {
  getRentingBooks: async (req, res, next) => {
    let { status, page } = req.query;
    let { user } = req.user;
    if (!status) {
      status = "spending";
    }
    try {
      let rentingBooks = await RentingBook.paginate(
        {
          status,
          user: user._id,
        },
        {
          limit: 10,
          page,
          populate: [
            {
              path: "book",
              select: "_id name slug",
            },
          ],
        }
      );
      return res.json(
        ResponseSuccess({
          data: rentingBooks,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  rentBook: async (req, res, next) => {
    try {
      let { _id: user_id } = req.user;
      let { days_after_expire, quantity } = req.validated;
      let { _id: book_id } = req.validated.book;

      let rentingBook = await RentingBookService.create({
        book: book_id,
        user: user_id,
        expire_at: moment().add(days_after_expire, "days"),
        quantity,
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
  destroyRentingBook: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await RentingBookService.delete({
        _id,
      });
      return res.json(
        ResponseSuccess({
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
