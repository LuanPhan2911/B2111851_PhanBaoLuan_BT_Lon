const { model, Schema } = require("mongoose");
const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Comment", commentSchema);
