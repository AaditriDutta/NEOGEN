const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    author: String,
    postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    title: String,
    body: { type: String, required: true },
    codeBody: String,
    rootId: { type: mongoose.Schema.ObjectId, ref: "Comment", required: false },
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: false,
    },
  },
  { timestamps: true }
);
const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
