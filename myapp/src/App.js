import React,{useEffect,createContext,useContext,useReducer} from 'react'
import Navbar from "./Component/Navbar";
import {Route,Routes,useNavigate} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/Login"
import Profile from "./Component/Profile"
import Signup from './Component/Signup';
import CreatePost from "./Component/CreatePost"
import {reducer,initialState} from "./reducers/userReducer"


export const UserContext=createContext();

const Routing=()=>{
  const navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext); 
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      dispatch({type:"USER",payload:user})
     
    }
    else
    {
      navigate("/signin");
    }
  },[])
  return (
  <Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/signin" element={<Login></Login>}></Route>
  <Route path="/signup" element={<Signup></Signup>}></Route>
  <Route path="/profile" element={<Profile></Profile>}></Route>
  <Route path="/createpost" element={<CreatePost></CreatePost>}></Route>
  </Routes>
  );

}

const App = () => {
  const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <div>
      <UserContext.Provider value={{state,dispatch}}>
      <Navbar> </Navbar>
     <Routing></Routing>
     </UserContext.Provider>

    
       
     
    </div>
  )
}

export default App