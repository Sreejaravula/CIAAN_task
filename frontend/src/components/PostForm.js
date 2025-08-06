// src/components/PostForm.js

import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
        setError("Post content cannot be empty.");
        return;
    }
    setError('');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        { content },
        config
      );
      setContent('');
      onPostCreated(); // Callback to refresh the posts list in HomePage
    } catch (err) {
      console.error('Failed to create post:', err);
      setError("Could not create the post. Please try again.");
    }
  };

  return (
    <div className="post-form">
      <h3>Create a Post</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <textarea
            rows="4"
            placeholder="What is on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;