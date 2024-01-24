const { model, Schema } = require("mongoose");
const publisherSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    reader: {
      type: Schema.Types.ObjectId,
      ref: "Reader",
      required: true,
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
module.exports = model("Publisher", publisherSchema);
