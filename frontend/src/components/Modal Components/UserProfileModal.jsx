import React, { useContext } from 'react'
import ChatContext from "../../ChatContext";
import axios from "axios";


function UserProfileModal() {
  //Global States
  const { setShowUserProfile, selectedChat } = useContext(ChatContext);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowUserProfile((prevValue) => !prevValue)}
        >X</button>

        <h1 className='modal-title'>Username</h1>
        
      </div>
    </div>
  );
}

export default UserProfileModal