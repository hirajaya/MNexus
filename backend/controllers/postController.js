import Post from "../models/postModel.js";

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const image = req.file ? req.file.path : null; // Handle image upload if present
    const newPost = new Post({ title, content, image });
    const post = await newPost.save();
    res.status(201).json(post); // Return the created post
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log('Fetched posts:', posts);
    res.status(200).json(posts); // Return all fetched posts
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedData = { title, content };

    // Check if a new image was uploaded
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost); // Return the updated post
  } catch (error) {
    console.error('Error in updatePost:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export{ createPost, getAllPosts, deletePost, updatePost };