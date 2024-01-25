const Genre = require("../models/Genre");
const Book = require("../models/Book");
const slug = require("slug");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");

const GenreController = {
  index: async (req, res, next) => {
    try {
      let genres = await Genre.find({}, "-books");
      return res.json(
        ResponseSuccess({
          data: genres,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let { name } = req.body;
      let genre = await Genre.create({
        name,
        slug: slug(name),
      });
      return res.json(
        ResponseSuccess({
          data: genre,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  storeMany: async (req, res, next) => {
    try {
      let { genres: data } = req.body;
      data = data.map((item) => {
        return {
          ...item,
          slug: slug(item["name"]),
        };
      });
      let genres = await Genre.insertMany(data);

      return res.json(
        ResponseSuccess({
          data: genres,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      let { id } = req.params;
      await Genre.findByIdAndDelete(id);
      await Book.updateMany(
        {
          genre: id,
        },
        {
          $pull: {
            genre: id,
          },
        }
      );
      return res.json(
        ResponseSuccess({
          message: "Delete Genre Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = GenreController;
