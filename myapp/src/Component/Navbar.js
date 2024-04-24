import React from 'react'
import "../index.css"
import {Link,Route,Routes,useNavigate} from "react-router-dom"
import {useContext} from "react"
import {UserContext} from "../App"
const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);
  const navigate=useNavigate();
  const renderlist=()=>{
    if(state)
    {
      return [
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/createpost">CreatePost</Link></li>,
      <li>
        <Link to="reel">Reel Section</Link>
      </li>,
      <li>
        <button onClick={()=>{
          localStorage.clear();

          dispatch({type:"CLEAR"})
          navigate("/signin");

        }}
          className=" bg-red-600 btn waves-effect waves-light  " type="submit" name="action">Logout</button>
      </li>,
      
      
      
      ]
    }
    else
    {
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>,
        <li><Link to="/forgot-password">ForgotPassword</Link></li>
      ]
    }
  }
  return (
    <nav>
    <div className=" nav-wrapper blue">
     {/* <a href="#" className="brand-logo">Madhur Media</a> */}
     <li className="brand-logo"><Link to={state?"/":"/signin"}>Connectify</Link></li>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {renderlist()}

      </ul>
    </div>
  </nav>
  )
}

export default Navbar