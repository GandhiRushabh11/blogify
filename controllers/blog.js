const blog = require("../model/blog");
const comment = require("../model/comment");

exports.creatBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    await blog.create({
      title,
      body,
      coverImageURL: `/uploads/blog/${req.file.filename}`,
      createdBy: req.user._id,
    });

    res.status(201).render("addblog", { user: req.user });
  } catch (error) {
    res.status(400).render("addblog", { error: error });
  }
};
exports.getblogByid = async (req, res) => {
  try {
    const blogData = await blog.findById(req.params.id).populate("createdBy");
    const blogComments = await comment
      .find({ blogId: req.params.id })
      .populate("createdBy");
    res.status(201).render("blog", {
      user: req.user,
      blog: blogData,
      comment: blogComments,
    });
  } catch (error) {
    res.status(400).render("blog", { error: error });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    await blog.deleteOne({ _id: req.params.id });

    res.redirect("/blog/manageBlogs");
  } catch (error) {
    const blogDataByUser = await blog
      .find({ createdBy: req.user._id })
      .populate("createdBy");
    res.status(400).render("manageBlogs", {
      user: req.user,
      blogs: blogDataByUser,
      error: error,
    });
  }
};
