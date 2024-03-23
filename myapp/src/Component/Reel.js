import React, { useState } from 'react';

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
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Video</button>
      {uploadedUrl && (
        <div>
          <p>Video uploaded successfully!</p>
          <h1>{uploadedUrl}</h1>
          <video src={uploadedUrl} />
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
