const Book = require("../models/Book");
const { assetPath, remove } = require("../utils/fileStorage/upload");

const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const slug = require("slug");
const BookController = {
  index: async (req, res, next) => {
    try {
      let { page } = req.query;
      let books = await Book.paginate(
        {},
        {
          page,
          limit: 10,
          populate: [
            {
              path: "publisher",
              select: "-books",
            },
            {
              path: "genres",
              select: "-books",
            },
          ],
        }
      );
      return res.json(
        ResponseSuccess({
          data: books,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let book = await Book.create({
        ...req.validated,
        slug: slug(req.validated.name),
      });
      return res.json(
        ResponseSuccess({
          data: book,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let book = await Book.findById(_id)
        .populate("genres", "-books")
        .populate("publisher", "-books");
      return res.json(
        ResponseSuccess({
          data: book,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let book = await Book.findByIdAndUpdate(_id, {
        ...req.validated,
        slug: slug(req.validated.name),
      });
      return res.json(
        ResponseSuccess({
          data: book,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateImage: async (req, res, next) => {
    try {
      let { _id } = req.params;

      let book = await Book.findById(_id);
      if (book.image) {
        remove(book.image);
      }

      await Book.findByIdAndUpdate(_id, {
        image: assetPath(req.file?.path),
      });

      return res.json(
        ResponseSuccess({
          message: "Update Image Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let book = await Book.findByIdAndDelete(_id);
      if (book.image) {
        remove(book.image);
      }
      return res.json(
        ResponseSuccess({
          message: "Delete Book Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = BookController;
