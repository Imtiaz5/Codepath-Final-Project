// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { supabase } from '/client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase
      .from('musictable')
      .insert([{ title, description, youtube_link: youtubeLink, created_at: new Date().toISOString() }]);

    if (error) {
      toast.error(`Failed to add post: ${error.message}`);
    } else {
      toast.success("Post created successfully!");
      navigate('/gallery'); // Redirect to a gallery or home page where posts are displayed
    }
  };

  return (
    <div className="form-card">
      <h1>Create Your Music Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="YouTube Link" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
