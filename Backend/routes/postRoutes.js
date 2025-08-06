// backend/routes/postRoutes.js

import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostsByUser,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// protect middleware ensures only logged-in users can create posts
router.route('/').post(protect, createPost).get(getAllPosts);

router.route('/user/:userId').get(getPostsByUser);

export default router;