const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost/postsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Routes
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Posts & Comments API" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
