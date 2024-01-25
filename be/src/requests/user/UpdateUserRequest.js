const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");

const UpdateUserRequest = (req, res, next) => {
  try {
    const rules = {
      name: "required|string",
      birthday: "date",
      gender: "required|integer|in:0,1,2",
      avatar: "string",
      phoneNumber: "required|string",
      address: "required|string",
    };

    let validation = new Validator(req.body, rules);

    if (validation.passes()) {
      next();
    } else {
      next(FailValidateException(validation.errors.all()));
    }
  } catch (error) {
    next(error);
  }
};
module.exports = UpdateUserRequest;
