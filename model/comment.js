const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    blogId: {
      type: mongoose.Schema.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
