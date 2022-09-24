import React, {useState, useContext} from 'react'
import ChatContext from '../ChatContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";


function GroupChatModal() {
  //Global States
  const { setShowModal } = useContext(ChatContext);
  const loadSpinner = <div className="loading-wrapper">
    <span class="loading__anim loading-small"></span></div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowModal((prevValue) => !prevValue)}
        >
          X
        </button>
        <h1 className="modal-title">Create Group Chat</h1>
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
        <div className="selected-users-container">
          <span className="selected-user">Sam Saryon</span>
          <span className="selected-user">John Seikolom</span>
          <span className="selected-user">Sam Saryon</span>
          
        </div>
        {/* {loadSpinner} */}
        <button className="group-chat-submit-btn"> + Create Chat</button>
        <span className="modal-warning">
          Note: To create a group chat you must have at least{" "}
          <b>2 other users</b> selected and a group name.
        </span>
      </div>
    </div>
  );
}

export default GroupChatModal