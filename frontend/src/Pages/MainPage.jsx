import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContext from '../ChatContext'
import axios from 'axios'
import { findAdminChat } from '../config/ChatLogic'
import { useQueryClient } from "react-query";
import GroupChatModal from '../components/Modal Components/GroupChatModal'

const MainPage = () => {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

  //Refetching
  const queryClient = useQueryClient();

  //Global States
  const { showModal } = useContext(ChatContext);
  const navigate = useNavigate();

  //Checks if user is NOT logged in.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user) {
      navigate("/");
    }

    sendWelcomeMessage()

  }, []);

  //An automatic welcome message for new users from admin account.
  const sendWelcomeMessage = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      const adminChat = findAdminChat(data);
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
      <SideBar />
      <ChatBox />
      {showModal && <GroupChatModal />}
    </main>
  );
}

export default MainPage