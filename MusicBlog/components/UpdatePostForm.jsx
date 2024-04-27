// UpdatePostForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '/client/supabaseClient';
import { toast } from 'react-toastify';

const UpdatePostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', description: '', youtube_link: '' });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const { data, error } = await supabase.from('musictable').select('*').eq('id', id).single();
    if (error) {
      toast.error('Failed to fetch post');
    } else if (data) {
      setPost({ title: data.title, description: data.description, youtube_link: data.youtube_link });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('musictable')
      .update({
        title: post.title,
        description: post.description,
        youtube_link: post.youtube_link
      })
      .match({ id: id });  // Make sure to match the correct ID
  
    if (error) {
      toast.error(`Update failed: ${error.message}`);
    } else {
      toast.success("Post updated successfully!");
      navigate('/gallery');  // Redirect after successful update
    }
  };
  

  const handleChange = (field, value) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Post Title"
        />
        <textarea
          value={post.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={post.youtube_link}
          onChange={(e) => handleChange('youtube_link', e.target.value)}
          placeholder="YouTube Link"
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
