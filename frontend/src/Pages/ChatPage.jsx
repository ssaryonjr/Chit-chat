import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react'

const ChatPage = () => {

  const [messages, setMessages] = useState([])

  useEffect(() => {

    const fetchMessages = async() => {
      const data = await axios.get("/api/chat")
      console.log(data)
      setMessages(data.data)
    }
    fetchMessages()
  }, [])

  
  const showMessages = messages.map((chat, index) => {
    return <div key={chat._id}>{chat.chatName}</div>;
  });


  return (
    <>
      {showMessages}
    </>
    
    
  )
}

export default ChatPage