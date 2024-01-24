const { model, Schema } = require("mongoose");
const readerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Reader", readerSchema);
