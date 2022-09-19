import React, {useState, useContext} from 'react'
import ChatContext from '../ChatContext'

function GroupChatModal() {
  //Global States
  const { setShowModal } = useContext(ChatContext);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowModal((prevValue) => !prevValue)}
        >
          X
        </button>
        <h1 className='modal-title'>Create Group Chat</h1>
        <input
          className="group-chat-input"
          type="text"
          placeholder="Group chat name"
        ></input>
        <input
          className="group-chat-input"
          type="text"
          placeholder="Add users"
        ></input>
        
        <button className='group-chat-submit-btn'>Create Group</button>
      </div>
    </div>
  );
}

export default GroupChatModal