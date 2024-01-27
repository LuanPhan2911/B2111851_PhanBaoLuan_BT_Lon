const { model, Schema } = require("mongoose");
const rentingBook = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expire_at: {
      type: Date,
      required: true,
      min: Date.now(),
    },
    status: {
      type: String,
      enum: ["renting", "completed"],
      default: "renting",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("RentingBook", rentingBook);
