import React from 'react'
import axios from "axios";
import { useQuery } from "react-query";

import { getSenderName, getSenderPic, getFirstGroupPic, getSecondGroupPic } from '../../config/ChatLogic';


function MessagesTab() {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id;

  const { isLoading, data } = useQuery("chat-list", async () => {
    const data = await axios.get("/api/chat");
    return data;
  });

  const group = data?.data.map((chat) => {
    return console.log(chat?.chatName);
  });

  //Skeleton loader while fetchind data from database.
  const skeletonAmount = [1, 2, 3, 4, 5, 6, 7, 8];
  const renderSkeletons = skeletonAmount.map((loader) => {
    return (
      <div key={loader} className="skeleton">
        <div className="s-img"></div>
        <div className="s-line first"></div>
        <div className="s-line second"></div>
        <div className="s-line third"></div>
      </div>
    );
  });

  const messageList = data?.data.map((chat) => {
    return (
      <section className="user-conversation-container" key={chat?._id}>
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
          <span className="conversation-brief">WILL FILL IN LATER</span>
        </div>
        <div className="conversation-date">
          <span className="conversation-timestamp">10:22 PM</span>
          <div className="conversation-notification">
            <span className="notification-number">8</span>
          </div>
        </div>
      </section>
    );
  });

  return (
    <div className="open-tab">
      {isLoading ? (
        <div className="skeleton-container">{renderSkeletons}</div>
      ) : (
        <div className="conversation-list-wrapper">
          <h3 className="user-status-title">Recent Messages</h3>
          {messageList}
        </div>
      )}
    </div>
  );
}

export default MessagesTab