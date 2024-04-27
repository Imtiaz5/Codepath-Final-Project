import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import { supabase } from '/client/supabaseClient';

const MusicPostGallery = () => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortType, searchTerm]);  // React to changes in sortType or searchTerm

  const fetchPosts = async () => {
    let query = supabase.from('musictable').select('*');

    switch (sortType) {
      case 'alphabetical':
        query = query.order('title', { ascending: true });
        break;
      case 'date_asc':
        query = query.order('created_at', { ascending: true });
        break;
      case 'date_desc':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        break;
    }

    const { data, error } = await query;
    if (error) {
      console.log('Error fetching posts', error);
    } else {
      setPosts(data);
    }
  };

  const toggleSort = () => {
    if (sortType === 'alphabetical') {
      setSortType('date_asc');
    } else if (sortType === 'date_asc') {
      setSortType('date_desc');
    } else {
      setSortType('alphabetical');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  return (
    <div>
      <h1>Music Blog Posts</h1>
      <button onClick={toggleSort}>Change Sort</button>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      <div className="card-container">
        {filteredPosts.length > 0 ? filteredPosts.map((post) => (
          <div key={post.id} className="card">
            <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
            <img src={`https://img.youtube.com/vi/${extractVideoID(post.youtube_link)}/0.jpg`} alt="Thumbnail" style={{ width: '100%', height: 'auto' }} />
            <p>{post.description}</p>
            <VoteButtons post={post} />
          </div>
        )) : (
          <p>Sorry, we can't find that blog. Maybe make your own?</p>
        )}
      </div>
    </div>
  );
};

export default MusicPostGallery;
