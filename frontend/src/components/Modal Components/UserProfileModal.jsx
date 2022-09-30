import React, { useContext } from 'react'
import ChatContext from "../../ChatContext";
import { getUserStatusForList } from "../../config/ChatLogic";
import VerifiedBadge from '../../img/verifiedbadge.png'
import axios from 'axios';
import MessagesTab from '../SideBar Components/MessagesTab';

function UserProfileModal() {
  //Global States
  const { setShowUserProfile, profile, setProfile, chats, setChats, setSelectedChat, setSearch, setCurrentTab, width, setShowChatBox, setShowMessageList } = useContext(ChatContext);

  console.log(profile);

  //Creates and opens the chat that is clicked.
  let sendMessage;

  //If UI is in mobile ivew
  if (width < 930) {
    sendMessage = async (userId) => {
    try {
      const { data } = await axios.post(`/api/chat`, { userId });
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
       }
        setSearch("");
        setShowUserProfile(false)
        setShowMessageList(false);
        setShowChatBox(true);
        return setSelectedChat(data);
      } catch (error) { console.log(error) }
    };
  } else if (width > 930) {
    sendMessage = async (userId) => {
      try {
        const { data } = await axios.post(`/api/chat`, { userId });
        if (!chats.find((c) => c._id === data._id)) {
          setChats([data, ...chats]);
        }
        setSelectedChat(data);
        setSearch("");
        setShowUserProfile(false);
        setCurrentTab(<MessagesTab />);
      } catch (error) {
        console.log(error);
      }
    };
  }
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => {
            setShowUserProfile((prevValue) => !prevValue);
            setProfile("");
          }}
        >
          X
        </button>
        <div className="profile-pic-container">
          <img src={profile?.profilePic} alt="user picture" />
        </div>
        <h1 className="profile-modal-title">
          {profile?.firstName} {profile?.lastName}
          {profile?.verified && (
            <img src={VerifiedBadge} className="verified-badge" />
          )}
        </h1>
        <h2 className="profile-modal-sub-title">
          {getUserStatusForList(profile)}
        </h2>
        <div className="send-msg-container">
          <button
            className="send-msg-btn"
            onClick={()=> sendMessage(profile?._id)}
          >Send Message</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal