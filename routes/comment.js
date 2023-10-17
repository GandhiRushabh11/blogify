const comment = require("../model/comment");
const express = require("express");
const router = express.Router();

router.post("/:blogId", async (req, res) => {
  await comment.create({
    message: req.body.message,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
