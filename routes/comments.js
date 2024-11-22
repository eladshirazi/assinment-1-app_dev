const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Get all comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create comment
router.post("/", async (req, res) => {
  const comment = new Comment({
    postId: req.body.postId,
    sender: req.body.sender,
    content: req.body.content,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
