const Publisher = require("../models/Publisher");
const slug = require("slug");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const Book = require("../models/Book");

const PublisherController = {
  index: async (req, res, next) => {
    try {
      let publishers = await Publisher.find({}, "-books");
      return res.json(
        ResponseSuccess({
          data: publishers,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let { name } = req.body;
      let publisher = await Publisher.create({
        name,
        slug: slug(name),
      });
      return res.json(
        ResponseSuccess({
          data: publisher,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  storeMany: async (req, res, next) => {
    try {
      let { publishers: data } = req.body;
      data = data.map((item) => {
        return {
          ...item,
          slug: slug(item["name"]),
        };
      });
      let publishers = await Publisher.insertMany(data);

      return res.json(
        ResponseSuccess({
          data: publishers,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await Publisher.findByIdAndDelete(_id);
      await Book.updateMany(
        {
          publisher: _id,
        },
        {
          $set: {
            publisher: null,
          },
        }
      );
      return res.json(
        ResponseSuccess({
          message: "Delete Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = PublisherController;
