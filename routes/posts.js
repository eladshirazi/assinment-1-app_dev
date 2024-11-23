const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Create Post endpoint
router.post("/", async (req, res) => {
  try {
    const post = new Post({
      sender: req.body.sender,
      content: req.body.content,
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Get Posts by Sender
router.get("/sender/:senderId", async (req, res) => {
  try {
    const posts = await Post.find({ sender: req.params.senderId }); // get post by sender
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts by sender", error });
  }
});

module.exports = router;
