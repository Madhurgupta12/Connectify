import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CreateReelForm = () => {
  const [title, setTitle] = useState('');
  const [video, setVideoFile] = useState(null);
  const [url,setUrl]=useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'File Uploaded!',
      text: 'Your file has been uploaded successfully.',
    });
  };

 
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
          setUrl(data.secure_url);
          showSuccessAlert();
        } catch (error) {
          console.error('Error uploading video:', error);
        }
      };
  

  return (
    <div className="max-w-md mx-auto my-8">
      <form  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-gray-700 text-sm font-bold mb-2">Video File</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
          onClick={()=>handleUpload()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Reel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReelForm;