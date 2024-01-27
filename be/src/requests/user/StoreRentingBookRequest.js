const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");
const BookService = require("../../services/BookService");

const StoreRentingBookRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "book_id_valid",
      async function (_id, attribute, key, passes) {
        let book = await BookService.exist({
          _id,
        });
        if (!book) {
          return passes(false, "Invalid Book id");
        }
        if (book.remain_quantity < 1) {
          return passes(false, "No book to rent");
        }
        passes();
      }
    );

    const rules = {
      expire_at: "required|integer|min:1",
      book: {
        _id: "required|string|book_id_valid",
      },
    };
    let validation = new Validator(req.body, rules);

    validation.checkAsync(
      () => {
        let validKeys = Object.keys(rules);
        req.validated = filterObjectKeys(req.body, validKeys);
        next();
      },
      () => next(FailValidateException(validation.errors.all()))
    );
  } catch (error) {
    next(error);
  }
};
module.exports = StoreRentingBookRequest;
