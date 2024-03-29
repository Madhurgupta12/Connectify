import React from 'react'
import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import "../Component/style.css"
import ChatBox from './ChatBox'

const Search = () => {

  const [data,setData]=useState([]);

  useEffect(()=>{

   
    fetch("http://localhost:5001/api/chat",{
      method:"GET",
      headers:{
      "Content-Type": "application/json"
      },
    })
    .then(res=>res.json())
    .then((result)=>{
      setData(result);
      // console.log(data);
    })
  

  
  },[])

  console.log(data);
  return (
    <>
    
    <div className="aa bg-red-400 flex justify-center text-2xl">Connectify-Chats</div>

  {

  data.map((items,index)=>(
  
<>

  <div className=" w-30 lg:w-64 bg-gray-800 text-white">
    <div className="p-2 border-b border-gray-700">
     
    </div>
    <div className="overflow-y-auto">
      <div className="py-2 px-4 hover:bg-gray-700">

      
      <Link to="/chat"><p key={index} className="text-gray-200">{items.name}</p></Link>
       

       
       
       </div>
    </div>
  </div>
  
 
</>


  


    
  ))
 


}
    </>
    
  )
}

export default Search
