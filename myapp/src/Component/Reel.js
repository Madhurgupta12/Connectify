import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoUploader = () => {
 
  return (
    <div className="aa">
        <div className=" max-w-md mx-auto border rounded-lg overflow-hidden shadow-lg bg-gray-200" > 
          <ReactPlayer className=""
        url="https://res.cloudinary.com/dr81x5wpk/video/upload/v1711215778/wacjlaaol0nws9wnjcyb.mp4"
        controls={true}
        preload={true} 
       
      />
        </div>
        <br />
        <br />
        <div className=" max-w-md mx-auto border rounded-lg overflow-hidden shadow-lg bg-gray-200" > 
        
          <ReactPlayer className=""
        url="https://res.cloudinary.com/dr81x5wpk/video/upload/v1711215778/wacjlaaol0nws9wnjcyb.mp4"
        controls={true}
        preload={true} 
       
      />
        </div>
         
        
    </div>
  );
};

export default VideoUploader;
