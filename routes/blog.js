const express = require("express");
const router = express.Router();
const { creatBlog, getblogByid, deleteBlog } = require("../controllers/blog");
const multer = require("multer");
const blog = require("../model/blog");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/blog");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router
  .get("/", (req, res) => {
    res.render("addblog", { user: req.user });
  })
  .get("/manageBlogs", async (req, res) => {
    const blogDataByUser = await blog
      .find({ createdBy: req.user._id })
      .populate("createdBy");
    res.render("manageBlogs", {
      user: req.user,
      blogs: blogDataByUser,
    });
  })
  .get("/:id", getblogByid)
  .post("/", upload.single("cover_file"), creatBlog)
  .get("/deleteblog/:id", deleteBlog)
  .get("/editBlog/:id", getblogByid);
module.exports = router;
