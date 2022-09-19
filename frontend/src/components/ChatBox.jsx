import React, { useState, useContext } from 'react'
import axios from 'axios';
import ChatContext from '../ChatContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faFaceLaughBeam, faPaperPlane, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { getSenderName, getSenderPic, getSecondGroupPic, getFirstGroupPic } from '../config/ChatLogic';


function ChatBox() {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id;

  const { selectedChat } = useContext(ChatContext);

  console.log(selectedChat?.isGroupChat);

  return (
    <main className="chat-box">
      {selectedChat ? (
        <>
          <div className="current-msg-top-bar">
            {selectedChat?.isGroupChat ? (
              <div className="group-chat-wrapper">
                <div className="group-chat-icon-wrapper">
                  <span className="group-chat-user-profile">
                    <img src={getFirstGroupPic(loggedUserId, selectedChat)} />
                  </span>
                  <span className="group-chat-user-profile">
                    <img src={getSecondGroupPic(loggedUserId, selectedChat)} />
                  </span>
                  <div className="avatar group-circle">
                    <span className="group-count">
                      +{selectedChat?.users.length - 2}
                    </span>
                  </div>
                </div>
                <h1>{selectedChat?.chatName}</h1>
              </div>
            ) : (
              <div className="single-chat-user-wrapper">
                <img
                  src={getSenderPic(loggedUserId, selectedChat)}
                  alt="sender profile"
                  className="single-chat-sender-photo"
                />
                <div className="single-chat-user-details">
                  <h5 className="single-chat-user-name">
                    {getSenderName(loggedUserId, selectedChat)}
                  </h5>
                  <span className="single-chat-user-status">Online Now</span>
                </div>
              </div>
            )}
            <FontAwesomeIcon icon={faEllipsis} className="top-bar-msg-icon" />
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

            <FontAwesomeIcon
              icon={faFaceLaughBeam}
              className="send-msg-icons"
            />
            <button className="send-btn">
              <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
            </button>
          </div>
        </>
      ) : (
        <div className="unopened-chat-container">
          <h1 className="unopened-chat-title">
            Find a user to start a conversation
          </h1>
        </div>
      )}
    </main>
  );
}

export default ChatBox