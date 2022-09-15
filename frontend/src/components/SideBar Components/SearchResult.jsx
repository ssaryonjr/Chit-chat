import React from 'react'
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdBadge
} from "@fortawesome/free-solid-svg-icons";


function SearchResult(props) {
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loading = props.loading
  const data = props.data

  const openChat = () => {

  }

  //Skeleton loader while fetchind data from database.
  const skeletonAmount = [1,2,3,4,5,6,7]
  const renderSkeletons = skeletonAmount.map(loader => {
    return (
      <div key={loader} className="skeleton">
        <div className="s-img"></div>
        <div className="s-line first"></div>
        <div className="s-line second"></div>
        <div className="s-line third"></div>
      </div>
    );
  })

  const showList = data.map(user => {
    return (
      <div className="search-user-wrapper">
        <img className="user-status-thumbnail" src={user.profilePic} alt="user"/>
        <div className="user-status-info">
          <span className="user-status-name">
            {user.firstName} {user.lastName}
          </span>

          <span className="user-status-subtitle">Joined September 2022</span>
        </div>
        <div className="user-icon-wrapper">
          <button className="user-list-btn">
            <FontAwesomeIcon icon={faIdBadge} className="groupchat-icon" />
          </button>

          <button
            className="user-list-btn"
            onClick={openChat}
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
          {renderSkeletons}
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