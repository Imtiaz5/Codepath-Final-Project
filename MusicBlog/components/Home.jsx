// Home.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome Music Blog!</h1>
      <img src="/musicimg.png" alt="Welcome Image" style={{ maxWidth: '25%', height: 'auto' }} />
      <p>Make blogs about your favorite music and interact with others with their Music Blogs!</p>
      <Link to="/create">Create A Post</Link>
    </div>
  );
};

export default Home;
