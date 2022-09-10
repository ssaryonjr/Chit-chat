import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'

const MainPage = () => {
  return (
    <main className='homepage'>
      <SideBar />
      <ChatBox />
    </main>
  )
}

export default MainPage