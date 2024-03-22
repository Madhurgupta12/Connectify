import React,{useContext,useReducer} from 'react'
import "../index.css"
import swal from "sweetalert"
import {Link,useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import {UserContext} from "../App"
const Login = () => {
  const{state,dispatch}=useContext(UserContext);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
   const Navigate=useNavigate();


const postData=()=>{

fetch("http://localhost:5001/signin",{
  method: "POST",
  headers:{
  "Content-Type": "application/json"
  },
  body:JSON.stringify({
 email,password
  })
  
}).then(res=>res.json())
.then(data=>{

  if(data.error)
  {
    swal({
      text: "Unsuccessful response",
      icon: "error",
      buttons: false,
      timer: 3000,
    });
  }
  else
  {
  swal({
    text: "Successfully SignIn",
    icon: "success",
    buttons: false,
    timer: 3000,
  });
  //console.log(data);
  // console.log(JSON.stringify(data.user));
  
  localStorage.setItem("jwt",data.token);
  localStorage.setItem("user",JSON.stringify(data.user));
dispatch({type:"USER",payload:data.user})
  Navigate("/");
}
})
.catch(err=>{

  console.log(err);
})
}

  return (

<div className="h-screen bg-gradient-to-r from-blue-400 to-purple-500">
<div className="flex  justify-center">
  <div className="w-1/2 m-9 p-4 bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-3xl text-center mb-6">Connectify Login</h2>
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
      onClick={postData} 
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Submit
    </button>
    <h5 className="mt-3 text-center">
      <Link to="/signup" className="text-blue-400 text-lg">Don't have an account? Sign up</Link>
    </h5>
  </div>
</div>
</div>
  )
}

export default Login