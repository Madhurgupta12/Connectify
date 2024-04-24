import React from "react";
import "../index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  const PostData=(e)=>{


   

    fetch("http://localhost:5001/signup",{
      method: "POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email
      })


    }).then(res=>res.json())
    .then(data=>{
     
      swal({
        text: "Successfully Signup",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      
      console.log(data);
    
    })
    .catch(err=>{
      swal({
        text: "unsuccess Signup",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      console.log(err);
    })
    
    
    


  }
  return (

    <div className="h-screen bg-gradient-to-r from-blue-400 to-purple-500">
    <div className="flex justify-center">
  <div className="w-1/2 m-8 p-4 bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-3xl text-center mb-6">Connectify Signup</h2>
    <input
      type="text"
      placeholder="Username"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-400"
    />
    <input
      type="text"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-400"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-400"
    />
    <button
      className="w-full bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      onClick={PostData}
    >
      Submit
    </button>
    <h5 className="mt-3 text-center">
      <Link to="/signin" className="text-blue-400">Already have an account? Sign in</Link>
    </h5>
  </div>
</div>
</div>

  );
};

export default Signup;
