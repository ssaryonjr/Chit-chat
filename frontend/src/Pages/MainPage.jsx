import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContext from '../ChatContext'
import axios from 'axios'
import { findAdminChat } from '../config/ChatLogic'
import { useQueryClient } from "react-query";
import GroupChatModal from '../components/Modal Components/GroupChatModal'
import EditGroupChatModal from '../components/Modal Components/EditGroupChatModal'
import UserProfileModal from '../components/Modal Components/UserProfileModal'
import ToastNotification from '../components/ToastNotification'

const MainPage = () => {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

  //Global States
  const { showModal, showChatBox, showMessageList, width, setWidth, setShowChatBox, setShowMessageList, showEditModal, showUserProfile } = useContext(ChatContext);
  
  //Refetching
  const queryClient = useQueryClient();
  //Page Navigation
  const navigate = useNavigate();

  //Redirect user to login page if no token found.
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    sendWelcomeMessage();
  }, []);

  //Conditional rendering of components based from viewport width
  useEffect(() => {
    const handleResizeWindow = () => {
      setWidth(window.innerWidth);
    }

    if (width < 930) {
      setShowChatBox(false)
      setShowMessageList(true)
    }
    
   if (width > 930) {
    setShowChatBox(true);
     setShowMessageList(true);
    }
    
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  //Change user status to OFFLNIE when they exit window/tab.
  useEffect(() => {
    window.addEventListener("visibilitychange", showUserOffline);
    return () => {
      window.removeEventListener("visibilitychange", showUserOffline);
    };
  }, []);

  //Changes user status as offline
  const showUserOffline = async () => {
    try {
      await axios.put("/api/user/userStatus", {
        userId: currentUser._id,
        status: "offline",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //An automatic welcome message for new users from admin account.
  const sendWelcomeMessage = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      const adminChat = findAdminChat(data);
      console.log(adminChat);

      if (!adminChat?.latestMessage) {
        await axios.post("/api/message/welcomeMessage", {
          chatId: adminChat?._id,
        });
        queryClient.invalidateQueries(["chat-list"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="homepage">
      {showMessageList && <SideBar />}
      {showChatBox && <ChatBox />}
      {showModal && <GroupChatModal />}
      {showEditModal && <EditGroupChatModal />}
      {showUserProfile && <UserProfileModal />}
      <ToastNotification/>
    </main>
  );
}

export default MainPage