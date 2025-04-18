const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    email: { type: String },
    commentId: { type: mongoose.Schema.ObjectId, ref: "Comment" },
    direction: { type: Number, required: true },
  },
  { timestamps: true }
);

const VoteModel = mongoose.model("Vote", VoteSchema);
module.exports = VoteModel;
