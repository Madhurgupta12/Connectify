import React, { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:8000');
const Chat = () => {

  
  const {id}=useParams();
  const [title,setTitle]=useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');


 

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      socket.emit('chat message', { message: inputValue, receiverId: id });
      setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: 'You' }]);
      setInputValue('');
    }

    fetch("http://localhost:5001/api/message/send",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        authorization: "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text:title,
        rr:id
      })
    })
    .then((res)=>res.json())

    .then(result=>{
      if(result.success==true)
      {
console.log("success:true")
      }
      else
      {
        console.log("error")
      }
    })
    .catch(err=>{
      console.log("Error");
    })
    
  };
  const check=(e)=>{

    setTitle(e.target.value);
    setInputValue(e.target.value);
  }

  
//f
  useEffect(()=>{
    fetch(`http://localhost:5001/api/messages/${id}`,{
      method:"GET",
      headers:{
        authorization: "Bearer "+localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
      setMessages(result.data);
      console.log(result);

      console.log(result.data);
    })
    .catch((err)=>{
      console.error("error fetching");
    })

  },[])


  return (
    <div className="flex flex-col h-screen">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className="mb-2 flex">
                        <div className="rounded-lg bg-gray-200 p-2 max-w-max">
                            <span className="font-bold">{message.sender}: </span>
                            <span>{message.text}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 flex">
                <input
                    type="text"
                    value={inputValue}
                    onChange={check}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none"
                    placeholder="Type your message"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    
  );
};

export default Chat;
