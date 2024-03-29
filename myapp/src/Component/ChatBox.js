import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: 'You' }]);
      setInputValue('');
      // Here you would typically send the message to the server
      // and receive a response from the other user
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{message.sender}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="p-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 mr-2"
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
