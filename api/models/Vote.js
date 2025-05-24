const mongoose = require("mongoose"); // import mongoose

const VoteSchema = new mongoose.Schema( // define vote schema
  {
    author: { type: String, required: true }, // voter name
    email: { type: String }, // voter email
    commentId: { type: mongoose.Schema.ObjectId, ref: "Comment" }, // linked comment
    direction: { type: Number, required: true }, // 1 = upvote, -1 = downvote
  },
  { timestamps: true } // add createdAt/updatedAt
);

const VoteModel = mongoose.model("Vote", VoteSchema); // create model
module.exports = VoteModel; // export model


