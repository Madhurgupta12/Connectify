import React from 'react'
import {useEffect,useState,useContext} from "react"
import "../index"
import {UserContext} from "../App"
const Profile = () => {
  const[pics,setpics]=useState([]);
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    fetch("http://localhost:5001/mypost",{
     
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
  
    .then(result=>{
     setpics(result.post);
      console.log(result);
    })
  },[])
  return (
   <>
   {

   
    <div style={{margin:"0px auto" }}>
      <div style={{
        display: "flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
        
      }}>
        <div>
          <img className="ml-40" style={{width:"160px",height:"160px",borderRadius:"80px"}} src="https://media.istockphoto.com/id/1256127007/photo/close-up-portrait-of-his-he-nice-attractive-glad-cheerful-cheery-guy-pointing-forefinger.jpg?s=1024x1024&w=is&k=20&c=bureXUGLPM-M_eZTOdYHMKiP0CC4Am9mIPY50VEkSyo=" alt="" />
        </div>
        <div>
          <h1 className="  text-2xl">{state?state.name:"Loading"}</h1>
          <div className="qq">
            <h5 className="text-xl">40 post </h5>
            <h5 className="text-xl">40 follower </h5>
            <h5 className="text-xl">40 following </h5>
          </div>
        </div>
      </div>

      <div className="gallery">
        {
          pics.map(item=>{
            return (
         <img key={item._id} className="item" src={item.photo} alt="No photo available" />
            )

          })

        }
       

      </div>



    </div>
}
</>
  )
}

export default Profile