// src/components/PostItem.js

import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/profile/${post.user._id}`} className="post-author-link">
          {post.user ? post.user.name : 'Unknown User'}
        </Link>
        <span className="post-timestamp">
          - {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostItem;