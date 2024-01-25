const { model, Schema } = require("mongoose");
const userSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: Number,
      default: 1,
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
    role: {
      type: String,
      enum: ["admin", "reader"],
      default: "reader",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("User", userSchema);
