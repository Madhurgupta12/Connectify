import React,{useContext,useReducer} from 'react'
import "../index.css"
import swal from "sweetalert"
import {Link,useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import {UserContext} from "../App"
import ForgotPassword from "./ForgotPassword";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
const Login = () => {

  const{state,dispatch}=useContext(UserContext);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
   const Navigate=useNavigate();


  

   

  const firebaseConfig = {
    // apiKey: "AIzaSyBSNZ3ZAnLe8qJa5EyJAYnJ3tm8LlCk5MM",
    // authDomain: "connectify-e7580.firebaseapp.com",
    // projectId: "connectify-e7580",
    // storageBucket: "connectify-e7580.appspot.com",
    // messagingSenderId: "175406213064",
    // appId: "1:175406213064:web:3811ba4cec9e26a6e3c2fd",
    // measurementId: "G-9B1HLRVVB7"
    apiKey: "AIzaSyARqpSL2J7X7JvcqBM_Kfd_mduB-6dZElo",
    authDomain: "upload-9bc3b.firebaseapp.com",
    projectId: "upload-9bc3b",
    storageBucket: "upload-9bc3b.appspot.com",
    messagingSenderId: "292933174222",
    appId: "1:292933174222:web:5bd573c2702adac073a19f",
    measurementId: "G-TTY7D79HVB"

  };
  firebase.initializeApp(firebaseConfig);


   const handleSignIn = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const nn=user.displayName;
        const em=user.email;
        const pp=user.uid;
        fetch("http://localhost:5001/google",{
          method: "POST",
          headers:{
          "Content-Type": "application/json"
          },
          body:JSON.stringify({
          name:nn,email:em,password:pp
          })
          
        }).then(res=>res.json())
        .then(result=>{
        
          if(result.success==false)
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
          // console.log(data);
          // console.log(JSON.stringify(data.user));
          
          localStorage.setItem("jwt",result.token);
          localStorage.setItem("user",JSON.stringify(result.user));
         dispatch({type:"USER",payload:result.user})
          Navigate("/");
        }
        })
        .catch(err=>{
        
          console.log(err);
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error:', errorCode, errorMessage);
      });
  }


const postData=()=>{

fetch("http://localhost:5001/signin",{
  method: "POST",
  headers:{
  "Content-Type": "application/json"
  },
  body:JSON.stringify({
   email:email,password:password
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
  // console.log(data);
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
    <button 
       onClick={()=>handleSignIn()} 
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Sign Up with Google
    </button>

  </div>
</div>
</div>
  )
}

export default Login