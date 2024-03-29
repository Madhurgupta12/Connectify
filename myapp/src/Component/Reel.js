import React, { useState,useEffect} from 'react';
import ReactPlayer from 'react-player';

const VideoUploader = () => {

  const [data,setData]=useState([]);

useEffect(()=>{
  fetch("http://localhost:5001/ShowReel",{
    method:"GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
  .then((res)=>res.json())
  .then((result) => {
    console.log(result);
    setData(result.reel);
  })
  .catch((err)=>{
    console.log(err);
  })

},[]);

 
  return (
    <div className="aa bg-red-500">

        
        {data.map((item, index) => (
        <div key={index} className=" mt-3 max-w-md mx-auto border rounded-lg overflow-hidden shadow-lg bg-gray-200">
          <ReactPlayer
            url={item.url}
            controls={true}
            preload={true}
            width="100%"
            height="100%"
          />
          <h3 className="bg-yellow-700 text-2xl">{item.title}</h3>
        </div>
      ))}
       
         
        
    </div>
  );
};

export default VideoUploader;
