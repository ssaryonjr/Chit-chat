import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()

  //Checks if user is NOT logged in.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user) navigate("/");
  }, [])

  return (
    <main className='homepage'>
      <SideBar />
      <ChatBox />
    </main>
  )
}

export default MainPage