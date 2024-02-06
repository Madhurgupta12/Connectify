import React from 'react'
import {useState,useEffect} from "react"
import swal from "sweetalert"

const CreatePost = () => {
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [image,setImage]=useState("");
    const[url,setUrl]=useState("");
    useEffect(() =>{

        if(url)
        {
      
            fetch("http://localhost:5001/createpost",{
                method: "POST",
                headers:{
                  "Content-type":"application/json",
                  "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                 title,
                 body,
                 pic:url
                })
          
          
              }).then(res=>res.json())
              .then(data=>{
          
                  if(data.error)
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
const postDetails=()=>{
    const data=new FormData();
    data.append("file",image);
    data.append("upload_preset","Instagram Clone");
    data.append("cloud_name","dr81x5wpk")
    fetch("https://api.cloudinary.com/v1_1/dr81x5wpk/image/upload",{
        method: "POST",
        body:data

    })
    .then(res=>res.json())
    .then(data=>{
        setUrl(data.url);
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })
    


}

  return (
    <div className="flex  items-center justify-center">
       
    <div className="border border-red-500 w-1/2 p-8 m-10 card input-filled">
        <h2 className=" text-3xl flex justify-center">Create Post Instagram</h2>
        <input type="text" placeholder="Title"  value={title}
        onChange={(e)=>{
            setTitle(e.target.value);
        }}
        />
        <input type="text" placeholder="Write your Thought" value={body}
        onChange={(e)=>{
            setBody(e.target.value);
        }}
        />
        <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" className="bg-red-400"
        onChange={(e)=>{
            setImage(e.target.files[0]);
           
        }}
        
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button onClick={postDetails}  className=" bg-red-300 btn waves-effect waves-light flex justify-center " type="submit" name="action">Submit post</button>

    </div>
    </div>
  )
}

export default CreatePost