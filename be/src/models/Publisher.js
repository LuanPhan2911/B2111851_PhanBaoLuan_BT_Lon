const { model, Schema } = require("mongoose");
const publisherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Publisher", publisherSchema);
