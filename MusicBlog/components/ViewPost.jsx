import React from 'react';
import VideoEmbed from './VideoEmbed';

function ViewPost({ match }) {
  // Fetch the post data from Supabase using the ID from match.params.id
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // This should be fetched from the database

  return (
    <div>
      <VideoEmbed videoUrl={videoUrl} />
      {/* Display other post details here */}
    </div>
  );
}

export default ViewPost;
//not in use