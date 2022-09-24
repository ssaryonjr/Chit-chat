import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContext from '../ChatContext'
import GroupChatModal from '../components/GroupChatModal'
import axios from 'axios'

const MainPage = () => {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

  //Global States
  const { showModal, setShowModal } = useContext(ChatContext);
  const navigate = useNavigate();

  //Checks if user is NOT logged in.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user) navigate("/");
  }, []);

  //An automatic welcome message for new users from admin account.
  const sendWelcomeMessage = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      const chatId = data?.[0]?._id
      if (!data?.[0]?.latestMessage) {
        axios.post("/api/message/welcomeMessage", {
          chatId: chatId
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendWelcomeMessage();
  },[])
  

  
  return (
    <main className="homepage">
      <SideBar />
      <ChatBox />
      {showModal && <GroupChatModal />}
    </main>
  );
}

export default MainPage