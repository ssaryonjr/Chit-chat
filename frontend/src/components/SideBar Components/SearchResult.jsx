import React, {useState, useContext} from 'react'
import axios from 'axios';
import ChatContext from '../../ChatContext';
import MessagesTab from './MessagesTab';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdBadge
} from "@fortawesome/free-solid-svg-icons";

function SearchResult(props) {
  const { setSelectedChat, setSearch, setCurrentTab } = useContext(ChatContext)
  
  //Access logged in user data from local storage.
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

  const loading = props.loading
  const data = props.data

  //Opens the chat that is clicked.
  const openChat = async(userId) => {
    try {
      const { data } = await axios.post(`/api/chat`, { userId })
      return console.log(data)
    } catch (error) {
      
    }
    setSelectedChat(userId)
    setSearch('')
    setCurrentTab(<MessagesTab />)
  }


  //Skeleton loader while fetching data from api
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7]
  const skeletonLoader = skeletonArray.map(box => {
    return (
      <div key={box} className="skeleton">
        <div className="s-img"></div>
        <div className="s-line first"></div>
        <div className="s-line second"></div>
        <div className="s-line third"></div>
      </div>
    );
  })


  const showList = data.map((user, index) => {
    return (
      <div key={index} className="search-user-wrapper">
        <img className="user-status-thumbnail" src={user.profilePic} alt="user"/>
        <div className="user-status-info">
          <span className="user-status-name">
            {user.firstName} {user.lastName}
          </span>

          <span className="user-status-subtitle">Joined September 2022</span>
        </div>
        <div className="user-icon-wrapper">
          {/* <button className="user-list-btn">
            <FontAwesomeIcon icon={faIdBadge} className="groupchat-icon" />
          </button> */}

          <button
            value={user._id}
            className="user-list-btn"
            onClick={(e)=> openChat(e.target.value)}
          >
            <FontAwesomeIcon icon={faEnvelope} className="groupchat-icon" />
          </button>
        </div>
      </div>
    );
  })
  
  return (
    <>
      {loading ? (
        <div className="skeleton-container">
          {skeletonLoader}
        </div>
      ) : (
        <div className="user-list-wrapper">
          <h3 className="user-status-title">Searched Users:</h3>
            {data.length > 0
              ? showList
              : <h3>Unable to find user</h3>
            }
        </div>
      )}
    </>
  );
}

export default SearchResult