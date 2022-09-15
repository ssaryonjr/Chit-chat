import React from 'react'
import axios from "axios";
import { useQuery } from "react-query";

import { getSenderName, getSenderPic, getFirstGroupPic, getSecondGroupPic } from '../../config/ChatLogic';


function MessagesTab() {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id

  const { isLoading, data, error } = useQuery("chat-list", async() => {
    const data = await axios.get("/api/chat");
    return data
  });

  // const dm = data?.data.map(c => console.log(c?.users.filter(g => g._id !== currentUser._id)))

  // console.log(data?.data)

  
  const group = data?.data.map(chat => {
    return console.log(chat?.chatName)
  })
  console.log(group)

  


  
  const messageList = data?.data.map(chat => {
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
  })

  return (
    <div className="open-tab">
      <div className="conversation-list-wrapper">
        <h3 className="user-status-title">Recent Messages</h3>
        {messageList}

{/*         
        <section className="user-conversation-container">
          <div className="thumbnail-container">
            <img
              src="https://randomuser.me/api/portraits/men/59.jpg"
              alt="thumbnail"
              className="conversation-thumbnail"
            />
            <span className="online-circle"></span>
          </div>
          <div className="conversation-info">
            <h6 className="conversation-sender">
              David Johnson
            </h6>
            <span className="conversation-brief">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>
          <div className="conversation-date">
            <span className="conversation-timestamp">10:22 PM</span>
            <div className="conversation-notification">
              <span className="notification-number">8</span>
            </div>
          </div>
        </section>

        <section className="user-conversation-container">
          <div className="thumbnail-container">

            
            <div className="avatars">
              <span className="avatar">
                <img src="https://randomuser.me/api/portraits/men/83.jpg" />
              </span>
              <span className="avatar">
                <img src="https://randomuser.me/api/portraits/women/2.jpg" />
              </span>
              <div className="avatar group-circle">
                <span className="group-count">+9</span>
              </div>
            </div>


          </div>
          <div className="conversation-info">
            <h6 className="conversation-sender">Best coders group</h6>
            <span className="conversation-brief">
              I love juice and making ever.. we making two lines to see whats
              up..
            </span>
          </div>
          <div className="conversation-date">
            <span className="conversation-timestamp">10:22 PM</span>
            <div className="conversation-notification">
              <span className="notification-number">3</span>
            </div>
          </div>
        </section>

        <section className="user-conversation-container">
          <div className="thumbnail-container">
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              alt="thumbnail"
              className="conversation-thumbnail"
            />
            <span className="online-circle"></span>
          </div>
          <div className="conversation-info">
            <h6 className="conversation-sender">Jacob Smith</h6>
            <span className="conversation-brief">
              I love juice and making ever.. testing two lines again to see if
              i..
            </span>
          </div>
          <div className="conversation-date">
            <span className="conversation-timestamp">10:22 PM</span>
          </div>
        </section> */}
      </div>
    </div>
  );
}

export default MessagesTab