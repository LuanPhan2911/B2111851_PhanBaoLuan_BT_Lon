const { model } = require("mongoose");
const Comment = require("../models/Comment");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const CommentService = require("../services/CommentSerivce");

const CommentController = {
  index: async (req, res, next) => {
    try {
      let { page } = req.query;
      let comments = await Comment.paginate(
        {
          parent_id: null,
        },
        {
          page: page || 1,
          limit: 10,
          populate: {
            path: "user",
            select: "id name avatar",
          },
        }
      );

      return res.json(
        ResponseSuccess({
          data: comments,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getReplies: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let { page } = req.query;
      let comments = await Comment.paginate(
        {
          parent_id: _id,
        },
        {
          page: page || 1,
          limit: 10,
          populate: {
            path: "user",
            select: "id name avatar",
          },
        }
      );

      return res.json(
        ResponseSuccess({
          data: comments,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let { commentable, message, parent } = req.validated;
      console.log(commentable, message, parent);
      let comment = await Comment.create({
        commentable_id: commentable._id,
        commentable_type: commentable._type,
        message,
        parent_id: parent ? parent?.id : null,
        user: req.user._id,
      });
      let { parent_id } = req.validated;
      if (parent_id) {
        await Comment.findByIdAndUpdate(parent_id, {
          $inc: {
            replies_count: 1,
          },
        });
      }
      return res.json(
        ResponseSuccess({
          message: comment,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      return res.json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      return res.json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await Comment.deleteMany({
        parent_id: _id,
      });
      let comment = await Comment.findByIdAndDelete(_id);
      if (comment?.parent_id) {
        await Comment.findByIdAndUpdate(comment?.parent_id, {
          $inc: {
            replies_count: -1,
          },
        });
      }
      return res.json(
        ResponseSuccess({
          message: "Delete Comment Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  destroyAll: async (req, res, next) => {
    try {
      let { _id, _type } = req.validated?.commentable;
      await CommentService.deleteAll({
        _id,
        _type,
      });
      return res.json(
        ResponseSuccess({
          message: "Delete All Comment Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = CommentController;
