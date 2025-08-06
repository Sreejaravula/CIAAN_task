// backend/controllers/postController.js

import Post from '../models/Post.js';

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
export const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }

  const post = new Post({
    content,
    user: req.user._id, // from the 'protect' middleware
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

/**
 * @desc    Get all posts for the main feed
 * @route   GET /api/posts
 * @access  Public
 */
export const getAllPosts = async (req, res) => {
  // Populate 'user' field with just the name
  const posts = await Post.find({})
    .populate('user', 'name')
    .sort({ createdAt: 'desc' });
  res.json(posts);
};

/**
 * @desc    Get all posts by a specific user
 * @route   GET /api/posts/user/:userId
 * @access  Public
 */
export const getPostsByUser = async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate('user', 'name')
    .sort({ createdAt: 'desc' });
  res.json(posts);
};