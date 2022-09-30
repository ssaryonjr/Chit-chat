import React, {useContext} from 'react'
import axios from 'axios';
import ChatContext from '../../ChatContext';
import {getUserStatusForList } from '../../config/ChatLogic'
import VerifiedBadge from '../../img/verifiedbadge.png'

function SearchResult(props) {
  const { setProfile, setShowUserProfile } =
    useContext(ChatContext);

  //Access logged in user data from local storage.
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

  const loading = props.loading;
  const data = props.data;


  //Skeleton loader while fetching data from api
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7,8];
  const skeletonLoader = skeletonArray.map((box) => {
    return (
      <div key={box} className="skeleton">
        <div className="s-img"></div>
        <div className="s-line first"></div>
        <div className="s-line second"></div>
        <div className="s-line third"></div>
      </div>
    );
  });

  //Grabs user ID that's clicked and displays profile modal.
  const getUserProfile = async (id) => {
    if (!id) return;
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      setProfile(data);
      setShowUserProfile(true);
    } catch (error) {
      console.log(error);
    }
  };

  const showList = data?.slice(0, 14).map((user, index) => {
    return (
      <div key={index} className="search-user-wrapper">
        <img
          className="user-status-thumbnail"
          src={user.profilePic}
          alt="user"
        />
        <div className="user-status-info">
          <span className="user-status-name">
            {user.firstName} {user.lastName}
            {user.verified && (
              <img
                src={VerifiedBadge}
                className="verified-badge"
                alt="verified badge"
              />
            )}
          </span>

          <span className="user-status-subtitle">
            {getUserStatusForList(user)}
          </span>
        </div>
        <div className="user-icon-wrapper">
          {user.userStatus === "online" ? (
            <span className="user-status-online-indicator green"></span>
          ) : (
            <span className="user-status-online-indicator grey"></span>
          )}
        </div>
        <div
          className="invisible-search-wrapper"
          id={user._id}
          onClick={(e) => getUserProfile(e.target.id)}
        ></div>
      </div>
    );
  });

  return (
    <>
      {loading ? (
        <div className="skeleton-container">{skeletonLoader}</div>
      ) : (
        <div className="user-list-wrapper">
          {data.length > 0 ? (
            showList
          ) : (
            <div className="no-result-container">
              <h1 className="no-result-title">No results found..</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResult