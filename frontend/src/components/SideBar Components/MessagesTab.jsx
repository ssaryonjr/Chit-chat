import React, { useState, useContext } from "react";
import ChatContext from "../../ChatContext";
import axios from "axios";
import { useQuery } from "react-query";

import {
  getSenderName,
  getSenderPic,
  getFirstGroupPic,
  getSecondGroupPic,
} from "../../config/ChatLogic";

function MessagesTab() {
  //Global States
  const { selectedChat, setSelectedChat, chats, setChats, showModal, setShowModal } = useContext(ChatContext);

  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id;

  //Fetching all users chats
  const { data } = useQuery(["chat-list"], async () => {
    const data = await axios.get("/api/chat")
    setChats(data?.data)
    return data
  });


  const openChat = async(id) => {
    try {
      const data = await axios.get(`/api/chat/${id}`)
      return setSelectedChat(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  

  const messageList = data?.data.map((chat, index) => {
    return (
      <section className="user-conversation-container" key={index}>
        {chat.isGroupChat ? (
          <div className="thumbnail-container">
            <div className="avatars">
              <span className="avatar">
                <img src={getFirstGroupPic(loggedUserId, chat)} />
              </span>
              <span className="avatar">
                <img src={getSecondGroupPic(loggedUserId, chat)} />
              </span>
              <div className="avatar group-circle">
                <span className="group-count">+{chat?.users.length - 2}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="thumbnail-container">
            <img
              src={getSenderPic(loggedUserId, chat)}
              alt="user thumbnail"
              className="conversation-thumbnail"
            />
            <span className="online-circle"></span>
          </div>
        )}
        <div className="conversation-info">
          {!chat.isGroupChat ? (
            <h6 className="conversation-sender">
              {getSenderName(loggedUserId, chat)}
            </h6>
          ) : (
            <h6 className="conversation-sender">{chat?.chatName}</h6>
          )}
          <span className="conversation-brief">{chat?.latestMessage?.messageSent}</span>
        </div>
        <div className="conversation-date">
          <span className="conversation-timestamp">10:22 PM</span>
          <div className="conversation-notification">
            <span className="notification-number">8</span>
          </div>
        </div>
        <div
          className="invisible-msg-wrapper"
          id={chat?._id}
          onClick={(e)=> openChat(e.target.id)}
        ></div>
      </section>
    );
  });

  return (
    <div className="open-tab">
      <div className="conversation-list-wrapper">
        <div className="message-tab-info-wrapper">
          <h3 className="user-status-title">Recent Messages</h3>
          <button
            className="groupchat-button"
            onClick={()=> setShowModal(prevValue => !prevValue)}
          >+ Create Groupchat</button>
        </div>
        {messageList}
      </div>
    </div>
  );
}

export default MessagesTab;
