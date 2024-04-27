// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function VideoEmbed({ videoUrl }) {
  const videoID = extractVideoID(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  return (
    <iframe
      width="560"
      height="315"
      src={embedUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
}

function extractVideoID(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|(?:be\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/)))([\w-]+)(?:&.*)?/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default VideoEmbed;
