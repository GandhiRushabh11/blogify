const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [100, "Blog Title Limited to 100 Characters"],
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
