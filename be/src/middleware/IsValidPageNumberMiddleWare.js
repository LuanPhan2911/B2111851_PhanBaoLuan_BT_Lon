const isValidPageNumberMiddleware = (req, res, next) => {
  try {
    let { page } = req.query;
    page = Number(page);
    if (Number.isInteger(page)) {
      return next();
    }
    req.query.page = 1;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isValidPageNumberMiddleware;
