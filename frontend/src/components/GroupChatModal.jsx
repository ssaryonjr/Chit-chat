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

        <ul className="group-chat-user-finder-container">
          <li className="online-user-wrapper">
            <img
              className="user-status-thumbnail"
              src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBtYW58ZW58MHx8MHx8&w=1000&q=80"
            />
            <div className="user-status-info">
              <span className="user-status-name">
                Justin Jenkins
                {/* <img
                  src="https://www.trollishly.com/wp-content/uploads/2021/07/Get-Free-Eligibility-Check.png"
                  alt="verified"
                  className="verified-badge small"
                /> */}
              </span>

              <span className="user-status-subtitle">New User</span>
            </div>
            <span className="user-status-online-indicator grey"></span>
          </li>
          <li className="online-user-wrapper">
            <img
              className="user-status-thumbnail"
              src="https://media.istockphoto.com/photos/portrait-of-young-cheerful-african-american-woman-picture-id1207862195?k=20&m=1207862195&s=612x612&w=0&h=wc4k19nXnnogwobNULIwChFpDDZ9dgH5q0BACGs8gyA="
            />
            <div className="user-status-info">
              <span className="user-status-name">Leah Young</span>
              <span className="user-status-subtitle">New User</span>
            </div>
            <span className="user-status-online-indicator grey"></span>
          </li>
          <li className="online-user-wrapper">
            <img
              className="user-status-thumbnail"
              src="https://media.istockphoto.com/photos/portrait-of-young-cheerful-african-american-woman-picture-id1207862195?k=20&m=1207862195&s=612x612&w=0&h=wc4k19nXnnogwobNULIwChFpDDZ9dgH5q0BACGs8gyA="
            />
            <div className="user-status-info">
              <span className="user-status-name">Leah Young</span>
              <span className="user-status-subtitle">New User</span>
            </div>
            <span className="user-status-online-indicator grey"></span>
          </li>
        </ul>

        <div className="selected-users-container">
          <span className="selected-user">
            Sam Saryon <button className="selected-user-delete-btn">X</button>
          </span>
          <span className="selected-user">
            John Seikolom{" "}
            <button className="selected-user-delete-btn">X</button>
          </span>
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