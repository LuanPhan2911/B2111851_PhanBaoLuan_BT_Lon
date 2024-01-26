const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");

const UpdateBookRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "publisher_exist",
      async function (publisher, attribute, req, passes) {
        return (await PublisherService.exist(publisher))
          ? passes()
          : passes(false, "The publisher id field is not valid");
      }
    );
    Validator.registerAsync(
      "genre_exist",
      async function (genre, attribute, req, passes) {
        return (await GenreService.exist(genre))
          ? passes()
          : passes(false, "The genre field id is not valid");
      }
    );

    const rules = {
      name: "required|string",
      description: "required|string",
      author_name: "required|string",
      quantity: "required|integer",
      publisher: "required|publisher_exist",
      year_publish: "required|string",
      genres: "required|array",
      "genres.*": "required|genre_exist",
    };

    let validation = new Validator(req.body, rules);

    validation.checkAsync(
      () => {
        let validKeys = Object.keys(validation.rules);
        req.validated = filterObjectKeys(req.body, validKeys);
        next();
      },
      () => next(FailValidateException(validation.errors.all()))
    );
  } catch (error) {
    next(error);
  }
};
module.exports = UpdateBookRequest;
