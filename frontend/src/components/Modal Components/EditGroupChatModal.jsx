import React, {useState, useContext} from 'react'
import ChatContext from '../../ChatContext'
import axios from "axios";
import VerifiedBadge from "../../img/verifiedbadge.png";


function EditGroupChatModal() {
  //Global States
  const { setShowEditModal, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  //Local States
  const [updateGroupName, setUpdateGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState('')

  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
  const loggedUserId = currentUser._id;

  //Loading animation
  const loadSpinner = (
    <div className="loading-wrapper">
      <span className="loading__anim loading-small"></span>
    </div>
  );

 
  const handleRenameGroupChat = async() => {
    if (!updateGroupName) return
    if (updateGroupName.trim() === '') return

    try {
      const { data } = await axios.put("/api/chat/renameGc", {
        chatId: selectedChat?._id,
        chatName: updateGroupName
      });
      setSelectedChat(data)

    } catch (error) { console.log(error)}
    setUpdateGroupName('')
  }

  const handleSearch = async(search) => {
    setSearchQuery(search)
    if (!searchQuery) return;
    if (searchQuery.trim() === "") return;

    try {
      setLoading(true)
      const { data } = await axios.get(`/api/user?search=${searchQuery}`)

      setLoading(false);
      setSearchResults(data)
    } catch (error) { console.log(error)}
  }

  const handleAddUser = async(clickedUser) => {
    if (selectedChat?.users.find((user) => user?._id === clickedUser?._id)) {
      setWarning('User already exist in group chat.')
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.put('/api/chat/addGcUser', {
        chatId: selectedChat?._id,
        userId: clickedUser?._id
      })

      setLoading(false)
      setWarning('')
      setSelectedChat(data)
    } catch (error) { console.log(error) }
  }

  const handleRemoveUser = async (clickedUser) => {
    if (selectedChat?.users?.length === 3) {
      setWarning('Unable to remove user, group chat cannot have less than 3 users.')
      return
    }
      try {
        const { data } = await axios.put("/api/chat/removeGcUser", {
          chatId: selectedChat?._id,
          userId: clickedUser?._id
        }); 

        setSelectedChat(data)
      } catch (error) {
        
      }
    }

  return (
    <div className="modal-overlay">
      <div className="modal-content small">
        <button
          className="close-btn"
          onClick={() => setShowEditModal((prevValue) => !prevValue)}
        >
          X
        </button>

        <h1 className="modal-title">{selectedChat?.chatName}</h1>
        <div className="selected-users-container">
          {selectedChat?.users?.map((user) => {
            return (
              user?._id !== loggedUserId && (
                <div className="thumbnail-container">
                  <img
                    src={user?.profilePic}
                    alt="groupchat members"
                    className="group-chat-member-thumbnail"
                  />
                  {selectedChat?.groupHost === loggedUserId && (
                    <button
                      className="remove-user-btn"
                      onClick={() => handleRemoveUser(user)}
                    >
                      X
                    </button>
                  )}
                </div>
              )
            );
          })}
        </div>
        <div className="update-group-container">
          <input
            className="group-chat-input update-input"
            type="text"
            placeholder="Update chat name.."
            value={updateGroupName}
            onChange={(e) => setUpdateGroupName(e.target.value)}
          ></input>
          <button
            className="update-group-name-btn"
            onClick={handleRenameGroupChat}
          >
            Update
          </button>
        </div>

        <input
          className="group-chat-input"
          type="text"
          placeholder="Add new user to chat.."
          onChange={(e) => handleSearch(e.target.value)}
        ></input>

        {loading ? (
          loadSpinner
        ) : (
          <ul className="group-chat-user-finder-container">
            {searchQuery !== "" &&
              searchResults?.slice(0, 6).map((user, index) => {
                return (
                  <li key={index} className="online-user-wrapper">
                    <img
                      className="user-status-thumbnail"
                      src={user?.profilePic}
                    />
                    <div className="user-status-info">
                      <span className="user-status-name">
                        {user?.firstName} {user?.lastName}
                        {user.verified && (
                          <img
                            src={VerifiedBadge}
                            className="verified-badge"
                            alt="verified badge"
                          />
                        )}
                      </span>

                      <span className="user-status-subtitle">New User</span>
                    </div>
                    <span className="user-status-online-indicator grey"></span>
                    <div
                      className="invisible-search-wrapper"
                      onClick={() => handleAddUser(user)}
                    ></div>
                  </li>
                );
              })}
          </ul>
        )}

        <button
          className="group-chat-submit-btn leave"
          onClick={handleRemoveUser(loggedUserId)}
        >
          Leave Group Chat
        </button>

        <span className="modal-warning">
          <b>{warning}</b>
        </span>
      </div>
    </div>
  );
}

export default EditGroupChatModal