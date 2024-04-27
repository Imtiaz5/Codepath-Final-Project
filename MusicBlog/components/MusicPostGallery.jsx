import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import { supabase } from '/client/supabaseClient';

const MusicPostGallery = () => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPostsAndVotes();
  }, [sortType, searchTerm]);

  const fetchPostsAndVotes = async () => {
    try {
      // Fetch posts
      let { data: postsData, error: postsError } = await supabase.from('musictable').select('*');
      if (postsError) throw postsError;

      // Fetch votes
      let { data: votesData, error: votesError } = await supabase.from('votes2').select('*');
      if (votesError) throw votesError;

      // Aggregate votes into upvotes and downvotes per post
      const votesCount = votesData.reduce((acc, vote) => {
        acc[vote.post_id] = acc[vote.post_id] || { upvotes: 0, downvotes: 0 };
        vote.vote_type === 'up' ? acc[vote.post_id].upvotes++ : acc[vote.post_id].downvotes++;
        return acc;
      }, {});

      // Combine posts with their votes
      const postsWithVotes = postsData.map(post => ({
        ...post,
        upvotes: votesCount[post.id]?.upvotes || 0,
        downvotes: votesCount[post.id]?.downvotes || 0,
      }));

      setPosts(postsWithVotes);
    } catch (error) {
      console.error('Error loading posts:', error.message);
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

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
            <p>Upvotes: {post.upvotes}, Downvotes: {post.downvotes}</p>
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
