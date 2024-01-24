const ApiError = require("../ApiError");

module.exports = {
  UnAuthenticateException: new ApiError(401, "Unauthenticated"),
  ResourceNotFoundException: new ApiError(404, "Resource not found"),
  InvalidTokenException: new ApiError(400, "Invalid Access Token"),
  FailValidateException: (err) => {
    return new ApiError(400, "Invalid Data Validated", err);
  },
};
