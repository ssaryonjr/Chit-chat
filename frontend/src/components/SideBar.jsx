import React, {useState, useEffect, useContext} from 'react'
import ChatContext from '../ChatContext'
import MessageTab from './SideBar Components/MessagesTab'
import axios from 'axios'
import SearchResult from './SideBar Components/SearchResult'
import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretDown,
  faRightFromBracket,

  faMoon
} from "@fortawesome/free-solid-svg-icons";

function SideBar() { 
  //Global States
  const { search, setSearch, setShowModal } = useContext(ChatContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  
  const [showOnlineBoard, setShowOnlineBoard] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDD, setOpenDD] = useState(false)

useEffect(() => {
  if (search === "") {
    setShowOnlineBoard(true);
  }

  if (search !== "") {
    setShowOnlineBoard(false);

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`/api/user?search=${search}`, config);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }
}, [search]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const openDDMenu = () => {
    setOpenDD(prevValue => !prevValue)
  }

  const signOut = () => {
    navigate("/");
    JSON.parse(localStorage.removeItem("userData"));
    
  }

  return (
    <aside>
      <div className="message-tab-info-wrapper">
        <div className="menu-wrapper">
          <h3 className="msg-tab-title" onClick={openDDMenu}>
            Messages <FontAwesomeIcon icon={faCaretDown} />
          </h3>
          {openDD && (
            <div className="dd-menu">
              <ul className="dd-wrapper">
                <li className="menu-item">
                  <FontAwesomeIcon icon={faMoon} className="dd-menu-icon" />
                  Display Preference
                </li>
                <li className="menu-item" onClick={signOut}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="dd-menu-icon"
                  />
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          className="groupchat-button"
          onClick={() => setShowModal((prevValue) => !prevValue)}
        >
          + Create Groupchat
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Start a conversation.."
          value={search}
          onChange={handleSearchInput}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </div>

      {showOnlineBoard ? (
        <MessageTab />
      ) : (
        <SearchResult loading={loading} data={searchResult} />
      )}
    </aside>
  );
}

export default SideBar