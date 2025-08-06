// src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const { data: userData } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/profile/${id}`
        );
        setUser(userData);

        // Fetch user's posts
        const { data: postsData } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts/user/${id}`
        );
        setPosts(postsData);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <div className="profile-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>"{user.bio}"</p>
      </div>

      <h3>{user.name}'s Posts</h3>
      <div className="posts-feed">
        {posts.length > 0 ? (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <p>This user has not posted anything yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;