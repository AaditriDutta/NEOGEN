/*Mongoose schema for a comment system*/
/*A schema in Mongoose defines the structure of documents in a MongoDB collection.*/
const mongoose = require("mongoose"); // import mongoose

const CommentSchema = new mongoose.Schema(  // define schema
  {
    author: String, // commenter's name
    postedBy: { type: mongoose.Schema.ObjectId, ref: "User" }, // user reference
    title: String, // comment title
    body: { type: String, required: true }, // main content
    codeBody: String, // optional code
    rootId: { type: mongoose.Schema.ObjectId, ref: "Comment", required: false }, // root comment
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: false,
    }, // parent comment
  },
  { timestamps: true } // add timestamps
);
const CommentModel = mongoose.model("Comment", CommentSchema); // create model
module.exports = CommentModel; // export model
