import express from 'express';
import multer from 'multer';
import { createPost, getAllPosts,deletePost,updatePost } from '../controllers/postController.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new post
router.post('/posts', upload.single('image'), createPost);

// Get all posts
router.get('/posts', getAllPosts);

// Delete a post by ID
router.delete('/posts/:id', deletePost);
router.get('/posts/:id', updatePost);


// Update a post by ID
router.put('/posts/:id', upload.single('image'), updatePost);

export default router