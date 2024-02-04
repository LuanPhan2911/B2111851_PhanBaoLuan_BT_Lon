const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { UserService } = require("../../services");
const LoginRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "email_exist",
      async function (email, attribute, req, passes) {
        return (await UserService.emailExist(email))
          ? passes()
          : passes(false, "The email field is not exist ");
      }
    );
    const rules = {
      email: "required|email|email_exist",
      password: "required|min:6",
    };

    let validation = new Validator(req.body, rules);

    validation.checkAsync(
      () => next(),
      () => next(FailValidateException(validation.errors.all()))
    );
  } catch (error) {
    next(error);
  }
};
module.exports = LoginRequest;
