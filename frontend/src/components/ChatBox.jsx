import React, {useState, useContext} from 'react'
import ChatContext from '../ChatContext'


function ChatBox() {
  const {selectedChat} = useContext(ChatContext)

  return (
    <main className='chat-box'>
      <h1>{selectedChat}</h1>
    </main>
  )
}

export default ChatBox