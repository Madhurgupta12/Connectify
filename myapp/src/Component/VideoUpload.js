import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const VideoUpload = () => {
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const firebaseConfig = {
        apiKey: "AIzaSyBSNZ3ZAnLe8qJa5EyJAYnJ3tm8LlCk5MM",
        authDomain: "connectify-e7580.firebaseapp.com",
        projectId: "connectify-e7580",
        storageBucket: "connectify-e7580.appspot.com",
        messagingSenderId: "175406213064",
        appId: "1:175406213064:web:3811ba4cec9e26a6e3c2fd",
        measurementId: "G-9B1HLRVVB7"
      };
      firebase.initializeApp(firebaseConfig);

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleUpload = () => {
        const storageRef = firebase.storage().ref();
        const videoRef = storageRef.child(video.name);

        videoRef.put(video).then(() => {
            console.log('Video uploaded successfully!');
            videoRef.getDownloadURL().then((url) => {
                setVideoUrl(url);
            }).catch((error) => {
                console.error('Error getting download URL:', error);
            });
        }).catch((error) => {
            console.error('Error uploading video:', error);
        });
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            <button onClick={handleUpload}>Upload Video</button>
            {videoUrl && (
                <div>
                    <p>URL of the uploaded video:</p>
                    <video width="320" height="240" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p><a href={videoUrl} target="_blank" rel="noopener noreferrer">Open Video in New Tab</a></p>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
