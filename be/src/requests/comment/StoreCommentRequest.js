const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");
const CommentService = require("../../services/CommentSerivce");

const StoreCommentRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "comment_parent_exist",
      async function (data, attribute, req, passes) {
        return (await CommentService.exist({
          _id: data,
        }))
          ? passes()
          : passes(false, "The parent replies id field is not valid");
      }
    );
    Validator.registerAsync(
      "commentable_id_valid",
      async function (data, attribute, key, passes) {
        let { commentable_type } = req.body;
        if (["Book"].includes(commentable_type)) {
          let isValid = await CommentService.validCommentableId({
            _id: data,
            type: commentable_type,
          });
          if (isValid) {
            return passes();
          }
        }
        return passes(false, "Invalid commentable id");
      }
    );

    const rules = {
      message: "required|string",
      parent_id: "string|comment_parent_exist",
      commentable_type: "required|in:Book",
      commentable_id: "required|string|commentable_id_valid",
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
module.exports = StoreCommentRequest;
