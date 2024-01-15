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
  const PostData=()=>{


   

    fetch("http://localhost:5000/signup",{
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
      console.log(err);
    })
    
    


  }
  return (
    <div className="mycard flex justify-center">
      <div className="aaa w-1/2 m-8 p-4 card auth-card ">
        <h2 className="  text-3xl flex items-center justify-center">
          Instgaram-Signup
        </h2>
        <input
          type="text"
          placeholder="UserName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input type="text" placeholder="email" value={email} 
          onChange=
          {(e) => {
            setEmail(e.target.value);
          }}>
          
          
        </input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          className=" bg-red-300 btn waves-effect waves-light flex justify-center "
          type="submit"
          name="action"
          onClick={PostData}
        >
          Submit
        </button>
        <h5 className="mt-3">
          <Link to="/signin">Already Have a Account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
