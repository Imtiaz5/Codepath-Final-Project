// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '/components/Home';
import './App.css';
import UpdatePostForm from '/components/UpdatePostForm';
import CreatePost from '/components/CreatePost';
import MusicPostGallery from '/components/MusicPostGallery';
import MusicPostInfo from '/components/MusicPostInfo';
import Login from '/components/Login';
import CreateAccount from '/components/CreateAccount';    <Route path="/login" element={<Login />} />
import Navbar from '/components/NavBar'; // Assuming you have a Navbar component
//import NotFound from '/components/NotFound'; // A component to display when no route matches

function App() {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <Navbar />
        </div>
        <div className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/gallery" element={<MusicPostGallery />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<MusicPostInfo />} />
            <Route path="/edit/:id" element={<UpdatePostForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
