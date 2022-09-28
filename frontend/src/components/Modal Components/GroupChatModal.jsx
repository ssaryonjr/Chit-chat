import React, {useState, useContext} from 'react'
import ChatContext from '../../ChatContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useQueryClient } from 'react-query'

function GroupChatModal() {
  //Global States
  const { setShowModal, setSelectedChat, width, setShowMessageList, setShowChatBox } = useContext(ChatContext);

  //Local States
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //Access logged in user data from local storage.
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

  //Refetching 
  const queryClient = useQueryClient();

  const loadSpinner = (
    <div className="loading-wrapper">
      <span className="loading__anim loading-small"></span>
    </div>
  );

  const handleSearch = async(input) => {
    setSearchQuery(input);
    if (!input) {
      return; //False value
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user?search=${searchQuery}`)

      setLoading(false)
      setSearchQueryResults(data)

    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!groupChatName || !selectedUsers) {
      return 
    }
    
    try {
      const { data } = await axios.post(`/api/chat/groupChat`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map(user => user?._id))
      })
      
      queryClient.invalidateQueries(["chat-list"]);

      if (width > 930) {
        setShowModal(false)
        setSelectedChat(data)
      } else if (width < 930) {
        setShowMessageList(false)
        setShowChatBox(true)
        setShowModal(false);
        setSelectedChat(data);
      }
      
    
    } catch (error) {
      console.log(error)
    }
  };

  const addToSelectedUsers = (addedUser) => {
    if (selectedUsers.includes(addedUser)) {
      return 
    }
    setSelectedUsers([...selectedUsers, addedUser])
  }

  const removeSelectedUser = (removedUser) => {
    setSelectedUsers(selectedUsers.filter(user => user?._id !== removedUser._id))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowModal((prevValue) => !prevValue)}
        >
          X
        </button>
        <h1 className="modal-title">Create Group Chat</h1>
        <input
          className="group-chat-input"
          type="text"
          placeholder="Group chat name"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        ></input>

        <input
          className="group-chat-input"
          type="text"
          placeholder="Add users"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>

       {loading ? (
        loadSpinner
        ): (
            <ul className="group-chat-user-finder-container">
              {searchQuery !== '' && searchQueryResults?.slice(0, 6).map((user, index) => {
                return (
                  <li key={index} className="online-user-wrapper">
                    <img
                      className="user-status-thumbnail"
                      src={user?.profilePic}
                    />
                    <div className="user-status-info">
                      <span className="user-status-name">
                        {user?.firstName} {user?.lastName}
                      </span>

                      <span className="user-status-subtitle">New User</span>
                    </div>
                    <span className="user-status-online-indicator grey"></span>
                    <div
                      className="invisible-search-wrapper"
                      id={user}
                      onClick={()=> addToSelectedUsers(user)}
                    ></div>
                  </li>
                );
              })}
          </ul>)
        }

        {selectedUsers.length > 0 && <div className="selected-users-container">
          {selectedUsers.map((user, index) => {
            return (
              <span className="selected-user" key={index}>
                {user.firstName} {user.lastName}
                <button
                  className="selected-user-delete-btn"
                  onClick={()=> removeSelectedUser(user)}
                >X</button>
              </span>
            );
          })}
        </div>}


        <button className="group-chat-submit-btn" onClick={handleSubmit}>
          + Create Chat
        </button>
        <span className="modal-warning">
          Note: To create a group chat you must have at least{" "}
          <b>2 other users</b> selected and a group name.
        </span>
      </div>
    </div>
  );
}

export default GroupChatModal