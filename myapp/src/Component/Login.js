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
    <div className="mycard flex justify-center">
    <div className=" aaa w-1/2 m-9 p-4 card auth-card ">
      <h2 className="     text-3xl flex items-center justify-center">Instgaram-Login</h2>
      <input type="text" placeholder='email'
      value={email}
      onChange={(e)=>{
        setEmail(e.target.value);
      }}
      >
      </input>
      <input type="password" placeholder='password'
      value={password}
      onChange={(e)=>{
        setPassword(e.target.value);
      }}
      
      
      ></input>
      <button  onClick={postData} className=" bg-red-300 btn waves-effect waves-light flex justify-center " type="submit" name="action">Submit
    
  </button>
  <h5 className="mt-3">
        <Link to="/signup"><span className=" text-blue-400 text-xl">Do not Have a Account?</span>
        </Link>
      </h5>
    </div>
    </div>
  )
}

export default Login