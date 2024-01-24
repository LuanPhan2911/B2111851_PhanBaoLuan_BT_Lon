const { model, Schema } = require("mongoose");
const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
    },
    genre: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    year_publish: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Book", bookSchemaSchema);
