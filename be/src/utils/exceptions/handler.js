const ApiError = require("../ApiError");

module.exports = {
  UnAuthenticateException: new ApiError(401, "Unauthenticated"),
  ResourceNotFoundException: new ApiError(404, "Resource not found"),
  InvalidTokenException: new ApiError(400, "Invalid Access Token"),
  NoPermissionAccessException: new ApiError(403, "No Permission Access"),
  FileNotFoundException: new ApiError(400, "No file to uploaded"),
  InvalidObjectIdException: new ApiError(400, "Invalid Object Id"),
  FailValidateException: (err) => {
    return new ApiError(400, "Invalid Data Validated", err);
  },
};
