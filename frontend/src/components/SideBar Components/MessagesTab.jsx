import React, { useState, useContext } from "react";
import ChatContext from "../../ChatContext";
import axios from "axios";
import { useQuery } from "react-query";

import {
  getSenderName,
  getSenderPic,
  getFirstGroupPic,
  getSecondGroupPic,
  messageBrief,
  latestMessageTime,
  showStatusIcon
} from "../../config/ChatLogic";

function MessagesTab() {
  //Global States
  const { setSelectedChat, selectedChat, setChats, isTyping } = useContext(ChatContext);
  
  const currentTime = new Date()

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
      <section style={{borderLeft: selectedChat?._id === chat?._id ? '10px solid #0B93F6' : 'none'}} className="user-conversation-container" key={index}>
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
            {showStatusIcon(loggedUserId, chat) &&<span className="online-circle"></span>}
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
          <span className="conversation-brief">
            {isTyping
              ? 'Typing...'
              : messageBrief(chat?.latestMessage?.messageSent)
              }
          </span>
        </div>
        <div className="conversation-date">
          <span className="conversation-timestamp">{latestMessageTime(currentTime, new Date(chat?.latestMessage?.updatedAt))}</span>

          {/* <div className="conversation-notification">
            <span className="notification-number">1</span>
          </div> */}

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
      <div className="conversation-list-wrapper">
        {messageList}
      </div>
  
  );
}

export default MessagesTab;
