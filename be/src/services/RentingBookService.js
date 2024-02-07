const { isValidObjectId } = require("mongoose");
const RentingBook = require("../models/RentingBook");
const Book = require("../models/Book");

class RentingBookService {
  static async create({ book, user, expire_at, quantity, status }) {
    let rentingBook = await RentingBook.create({
      book,
      user,
      expire_at,
      quantity,
      status,
    });
    return rentingBook;
  }
  static async delete({ _id }) {
    let rentingBook = await RentingBook.findByIdAndDelete(_id);
    return rentingBook;
  }
}
module.exports = RentingBookService;
