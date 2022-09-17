import React, {useState, useContext} from 'react'
import ChatContext from '../ChatContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faFaceLaughBeam, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ChatBox() {
  const {selectedChat} = useContext(ChatContext)

  return (
    <main className="chat-box">
      <div className="current-msg-top-bar">
        <div className="single-chat-user-wrapper">
          <img
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="sender profile"
            className="single-chat-sender-photo"
          />
          <div className="single-chat-user-details">
            <h5 className='single-chat-user-name'>Random User</h5>
            <span className='single-chat-user-status'>Online Now</span>
          </div>
        </div>
      </div>
      <div className="open-msg-box"></div>
      <div className="msg-input-container">
        <FontAwesomeIcon icon={faPaperclip} className="send-msg-icons" />
        <form className="send-msg-form">
          <label htmlFor="text-msg">
            <input
              type="text"
              placeholder="Send a message"
              className="send-msg-input"
            />
          </label>
        </form>

        <FontAwesomeIcon icon={faFaceLaughBeam} className="send-msg-icons" />
        <button className="send-btn">
          <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
        </button>
      </div>
    </main>
  );
}

export default ChatBox