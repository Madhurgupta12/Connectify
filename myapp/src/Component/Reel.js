import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoUploader = () => {
  const [video, setVideo] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', video);
      formData.append('upload_preset', 'Instagram Clone'); // Replace 'your_upload_preset' with your Cloudinary upload preset

      const response = await fetch('https://api.cloudinary.com/v1_1/dr81x5wpk/video/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setUploadedUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleChange = (event) => {
    setVideo(event.target.files[0]);
  };

  return (
    <div className="aa">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Video</button>
      
        <div className=" max-w-md mx-auto border rounded-lg overflow-hidden shadow-lg bg-gray-200" > 
        <h1>{uploadedUrl}</h1>
          <ReactPlayer className=""
        url="https://res.cloudinary.com/dr81x5wpk/video/upload/v1711215778/wacjlaaol0nws9wnjcyb.mp4"
        controls={true}
        preload={true} 
       
      />
        </div>
        <br />
        <br />
        <div className=" max-w-md mx-auto border rounded-lg overflow-hidden shadow-lg bg-gray-200" > 
        <h1>{uploadedUrl}</h1>
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
