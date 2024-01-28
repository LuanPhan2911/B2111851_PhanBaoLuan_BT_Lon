const { isValidObjectId } = require("mongoose");
const RentingBook = require("../models/RentingBook");
const Book = require("../models/Book");

class RentingBookService {
  static async create({ book, user, expire_at, quantity }) {
    let rentingBook = await RentingBook.create({
      book,
      user,
      expire_at,
      quantity,
    });
    await Book.findByIdAndUpdate(book, {
      $inc: {
        remain_quantity: -rentingBook.quantity,
      },
    });
    return rentingBook;
  }
  static async delete({ _id }) {
    let rentingBook = await RentingBook.findByIdAndDelete(_id);
    if (rentingBook) {
      await Book.findByIdAndUpdate(rentingBook.book, {
        $inc: {
          remain_quantity: rentingBook.quantity,
        },
      });
    }
    return rentingBook;
  }
}
module.exports = RentingBookService;
