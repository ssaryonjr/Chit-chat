import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContext from '../ChatContext'
import GroupChatModal from '../components/GroupChatModal'


const MainPage = () => {
  //Global States
  const {
    showModal,
    setShowModal,
  } = useContext(ChatContext);
  const navigate = useNavigate();

  //Checks if user is NOT logged in.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user) navigate("/");
  }, []);

  return (
    <main className="homepage">
      <SideBar />
      <ChatBox />
      {showModal && <GroupChatModal />}
    </main>
  );
}

export default MainPage