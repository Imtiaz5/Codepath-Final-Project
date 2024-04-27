// MusicPostInfo.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '/client/supabaseClient';
import VideoEmbed from './VideoEmbed';
import Comments from './Comments';
import { toast } from 'react-toastify';

const MusicPostInfo = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        const { data, error } = await supabase.from('musictable').select('*').eq('id', id).single();
        if (error) {
            console.error('Error fetching post:', error);
        } else {
            setPost(data);
        }
    };

    const handleDelete = async () => {
      if (window.confirm("Do you want to delete this post?")) {
          toast.info('Deleting post...');
          setTimeout(async () => {
              const { error } = await supabase.from('musictable').delete().eq('id', id);
              if (error) {
                  console.error('Error deleting post:', error.message);
                  toast.error('Failed to delete post.');
              } else {
                  toast.success('Post deleted successfully!');
                  navigate('/gallery'); // Redirect to the gallery after deletion
              }
          }, 1000);
      }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // Assuming you have a route for editing posts
};

    if (!post) return <div>Loading...</div>;

    return (
      <div>
      <h1>{post.title}</h1>
      <div className="video-embed-container">
          <VideoEmbed videoUrl={post.youtube_link} />
      </div>
      <p>{post.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button onClick={handleEdit} style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>Edit Post</button>
          <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete Post</button>
      </div>
      <Comments postId={id} />
  </div>
    );
};

export default MusicPostInfo;
