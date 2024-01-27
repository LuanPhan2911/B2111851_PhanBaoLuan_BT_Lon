const { isValidObjectId, default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");

class CommentService {
  static async exist({ _id }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await Comment.findById(_id);
      return data;
    } catch (error) {}
  }
  static async validCommentableId({ _id, type }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await mongoose.model(type).findById(_id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = CommentService;
