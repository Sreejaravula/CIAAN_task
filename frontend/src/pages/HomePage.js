// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
      setPosts(data);
    } catch (error) {
      console.error("Could not fetch posts:", error);
    }
  };

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!userInfo) {
      navigate('/login');
    } else {
      fetchPosts();
    }
  }, [userInfo, navigate]);

  return (
    <div>
      {userInfo && <PostForm onPostCreated={fetchPosts} />}
      <div className="posts-feed">
        <h2>Feed</h2>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;