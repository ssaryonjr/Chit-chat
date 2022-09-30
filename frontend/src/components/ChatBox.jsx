import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ChatContext from "../ChatContext";
import { useQueryClient } from "react-query";
import VerifiedBadge from '../img/verifiedbadge.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceLaughBeam,
  faPaperPlane,
  faEllipsis,
  faCircleChevronLeft
} from "@fortawesome/free-solid-svg-icons";

import {
  getSenderName,
  getSenderPic,
  getSecondGroupPic,
  getFirstGroupPic,
  getUserStatus,
  checkIfVerified,
  getUserId
} from "../config/ChatLogic";
import DisplayMessagesBox from "./Chat Components/DisplayMessagesBox";

import io from "socket.io-client";
const ENDPOINT = "https://chitchat-saryon.herokuapp.com/"; 
var socket, selectedChatCompare;

function ChatBox() {
  //Global states
  const {
    selectedChat,
    setUserIsTyping,
    setShowChatBox,
    setShowMessageList,
    setSelectedChat,
    width,
    setShowEditModal,
    setShowUserProfile,
    setProfile
  } = useContext(ChatContext);

  //Local states
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id;

  //Intializing Refetching
  const queryClient = useQueryClient();

  const fetchAllMessages = async () => {
    if (!selectedChat) return;
    try {
      const { data } = await axios.get(`/api/message/${selectedChat?._id}`);

      setAllMessages(data);
      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit("stop typing", selectedChat?._id);

    if (newMessage.trim().length === 0) {
      return; //No message sent
    }

    if (newMessage) {
      try {
        const { data } = await axios.post(`/api/message/`, {
          messageSent: newMessage,
          chatId: selectedChat?._id,
        });

        setNewMessage("");
        setTyping(false);

        socket.emit("new message", data);
        setAllMessages([...allMessages, data]);
        queryClient.invalidateQueries(["chat-list"]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Changes user status as online.
  const showUserOnline = async () => {
    try {
      await axios.put("/api/user/userStatus", {
        userId: loggedUserId,
        status: "online",
      });

    } catch (error) {
      console.log(error);
    }
  };

  //Initiating Socket.io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on("connected", () => {
      setSocketConnected(true);
      showUserOnline();
    });

    socket.on("typing", (room_id) => {
      setUserIsTyping((previousTypingMap) => {
        const updatedTypingMap = {
          ...previousTypingMap,
          [room_id]: true,
        };
        return updatedTypingMap;
      });
    });

    socket.on("stop typing", (room_id) => {
      setUserIsTyping((previousTypingMap) => {
        const updatedTypingMap = {
          ...previousTypingMap,
          [room_id]: false,
        };
        return updatedTypingMap;
      });
    });
    
    socket.on("stop typing", () => setUserIsTyping(false));

    socket.on('disconnected', () => {
      setSocketConnected(false)
    })

    return () => {
      socket.off('connected')
      socket.off('typing')
      socket.off('stop typing')
      socket.off('disconnect')
    }
  }, []);


  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);


  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageReceived?.chatReference?._id
      ) {
        //Give notification
        console.log("will noitify");
      } else {
        setAllMessages((prev) => [...prev, newMessageReceived]);
        queryClient.invalidateQueries(["chat-list"]);
      }
    });

  }, []);

  //Grabs user ID that's clicked and displays profile modal.
  const getUserProfile = async (id) => {
    if (!id) return 
    try {
      const { data } = await axios.get(`/api/user/${id}`)
      setProfile(data)
      setShowUserProfile(true)
    } catch (error) { console.log(error) }    
  }
 
  const userTyping = (e) => {
    setNewMessage(e.target.value)

    //Typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }

    if (e.target.value === "") {
      setTyping(false);
      socket.emit("stop typing", selectedChat?._id);
    }
  };

  const handleBackButton = () => {
    setShowChatBox(false)
    setShowMessageList(true)
    setSelectedChat('')
    setNewMessage()
  }

  if (width > 930) {
    setShowChatBox(true)
    setShowMessageList(true)
  }

  return (
    <main className="chat-box">
      {selectedChat ? (
        <>
          <div className="current-msg-top-bar">
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="back-btn"
              onClick={handleBackButton}
            />
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
                <h1 className="group-chat-name">
                  {selectedChat?.chatName.length > 21
                    ? selectedChat?.chatName.substring(0, 21) + ".."
                    : selectedChat?.chatName}
                </h1>
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
                    {checkIfVerified(loggedUserId, selectedChat) && (
                      <img src={VerifiedBadge} className="verified-badge" />
                    )}
                  </h5>
                  <span className="single-chat-user-status">
                    {getUserStatus(loggedUserId, selectedChat)}
                  </span>
                </div>
              </div>
            )}
            <FontAwesomeIcon
              icon={faEllipsis}
              className="top-bar-msg-icon"
              onClick={
                selectedChat?.isGroupChat
                  ? () => setShowEditModal(true)
                  : () => getUserProfile(getUserId(loggedUserId, selectedChat))
              }
            />
          </div>
          <div className="open-msg-box">
            <DisplayMessagesBox messages={allMessages} />
          </div>
          <div className="msg-input-container">
            <FontAwesomeIcon
              icon={faFaceLaughBeam}
              className="send-msg-icons"
            />
            <form className="send-msg-form" onSubmit={sendMessage}>
              <label htmlFor="text-msg">
                <input
                  type="text"
                  placeholder="Send a message"
                  className="send-msg-input"
                  onChange={userTyping}
                  value={newMessage}
                />
              </label>
            </form>

            <button className="send-btn">
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="send-icon"
                onClick={sendMessage}
              />
            </button>
          </div>
        </>
      ) : (
        <div className="unopened-chat-container">
          <h1 className="unopened-chat-title">
            Click a user to start a conversation
          </h1>
        </div>
      )}
    </main>
  );
}

export default ChatBox;
