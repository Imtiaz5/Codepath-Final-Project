// components/NavBar.jsx
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { supabase } from '/client/supabaseClient.js';


function NavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create a Post</Link></li>
        <li><Link to="/gallery">Browse what others have created!</Link></li>
        {/* <li><Link to="/login">Login</Link></li> */}
        {/* <li><button onClick={() => supabase.auth.signOut()}>Logout</button></li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
