import React, { useState,useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Swal from 'sweetalert2';
import swal from "sweetalert"
const firebaseConfig = {
    apiKey: "AIzaSyARqpSL2J7X7JvcqBM_Kfd_mduB-6dZElo",
    authDomain: "upload-9bc3b.firebaseapp.com",
    projectId: "upload-9bc3b",
    storageBucket: "upload-9bc3b.appspot.com",
    messagingSenderId: "292933174222",
    appId: "1:292933174222:web:5bd573c2702adac073a19f",
    measurementId: "G-TTY7D79HVB"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'File Uploaded!',
      text: 'Your file has been uploaded successfully.',
    });
  };


const VideoUpload = () => {
    const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [url,setUrl]=useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

useEffect(() =>{

    if(url)
    {
  
        fetch("http://localhost:5001/reel",{
            method: "POST",
            headers:{
              "Content-type":"application/json",
              "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
             title:title,
             url:url
            })
      
      
          }).then(res=>res.json())
          .then(data=>{
      
              if(data.success==false)
              {
           
                  swal({
                      text:"Unsuccessful post",
                      icon: "failure",
                      buttons: false,
                      timer: 3000,
                    });
          }
          else
          {
              swal({
                  text: "Successfully Create Post",
                  icon: "success",
                  buttons: false,
                  timer: 3000,
                });
              console.log(data);
          }
          
            
          })
          .catch(err=>{
              swal({
                  text:"error",
                  icon: "failure",
                  buttons: false,
                  timer: 3000,
                });
      
            console.log(err);
          })
          

    }
  
  },[url])

  const handleUpload = () => {
    if (video) {
      const storageRef = firebase.storage().ref(`videos/${video.name}`);
      storageRef.put(video).then((snapshot) => {
        console.log('Uploaded a video!', snapshot);
        // Optionally, you can retrieve the download URL
        storageRef.getDownloadURL().then((url1) => {
            setUrl(url1);
          console.log('File available at', url1);
        });
      });
    } else {
      console.error('No video selected!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-semibold text-center mb-6">Upload Video</h1>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter title"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
    <div className="flex items-center">
      <input type="file" onChange={handleFileChange} accept="video/*" className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-4" />
      <button onClick={handleUpload} className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">Upload</button>
    </div>
  </div>
  );
};

export default VideoUpload;
