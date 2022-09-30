import React, { useState, useContext, useEffect } from "react";
import ChatContext from "../../ChatContext";
import axios from "axios";
import { useQuery } from "react-query";
import VerifiedBadge from '../../img/verifiedbadge.png'

import {
  getSenderName,
  getSenderPic,
  getFirstGroupPic,
  getSecondGroupPic,
  messageBrief,
  latestMessageTime,
  showStatusIcon,
  checkIfVerified
} from "../../config/ChatLogic";

function MessagesTab() {
  //Global States
  const {
    setSelectedChat,
    selectedChat,
    setChats,
    setShowChatBox,
    setShowMessageList,
    width,
    userIsTyping,
  } = useContext(ChatContext);

  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id;

  //Fetching all users chats
  const { data } = useQuery(["chat-list"], async () => {
    const data = await axios.get("/api/chat");
    setChats(data?.data);
    return data;
  });

  let openChat;

  if (width < 930) {
    setShowChatBox(false);
    openChat = async (id) => {
      try {
        const data = await axios.get(`/api/chat/${id}`);
        setShowMessageList(false);
        setShowChatBox(true);
        return setSelectedChat(data.data);
      } catch (error) {
        console.log(error);
      }
    };
  } else if (width > 930) {
    setShowChatBox(true);
    openChat = async (id) => {
      try {
        const data = await axios.get(`/api/chat/${id}`);
        return setSelectedChat(data.data);
      } catch (error) {
        console.log(error);
      }
    };
  }

  const messageList = data?.data.map((chat, index) => {
    return (
      <section
        style={{
          borderLeft:
            selectedChat?._id === chat?._id ? "10px solid #0B93F6" : "none",
        }}
        className="user-conversation-container"
        key={chat?._id}
      >
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
            {showStatusIcon(loggedUserId, chat) && (
              <span className="online-circle"></span>
            )}
          </div>
        )}
        <div className="conversation-info">
          {!chat.isGroupChat ? (
            <h6 className="conversation-sender">
              {getSenderName(loggedUserId, chat).length > 20
                ? getSenderName(loggedUserId, chat).substring(0, 20) + ".."
                : getSenderName(loggedUserId, chat)}
              {checkIfVerified(loggedUserId, chat) && (
                <img
                  src={VerifiedBadge}
                  className="verified-badge"
                  alt="verified badge"
                />
              )}
            </h6>
          ) : (
            <h6 className="conversation-sender">
              {chat?.chatName.length > 20
                ? chat?.chatName.substring(0, 20) + ".."
                : chat?.chatName}
            </h6>
          )}
          <span className="conversation-brief">
            {userIsTyping[chat?._id]
              ? "Typing..."
              : messageBrief(chat?.latestMessage?.messageSent)}
          </span>
        </div>
        <div className="conversation-date">
          <span className="conversation-timestamp">
            {latestMessageTime(
              currentTime,
              new Date(chat?.latestMessage?.updatedAt)
            )}
          </span>

          {/* <div className="conversation-notification">
            <span className="notification-number">1</span>
          </div> */}
        </div>
        <div
          className="invisible-msg-wrapper"
          id={chat?._id}
          onClick={(e) => openChat(e.target.id)}
        ></div>
      </section>
    );
  });

  return <div className="conversation-list-wrapper">{messageList}</div>;
}

export default MessagesTab;
