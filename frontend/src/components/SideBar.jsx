import React, {useState, useEffect, useContext} from 'react'
import ChatContext from '../ChatContext'
import MessageTab from './SideBar Components/MessagesTab'
import axios from 'axios'
import SearchResult from './SideBar Components/SearchResult'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";

function SideBar() { 
//Global States
const { search, setSearch, setShowModal } = useContext(ChatContext);

  const user = JSON.parse(localStorage.getItem("userData"));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  
const [showOnlineBoard, setShowOnlineBoard] = useState(true);
const [searchResult, setSearchResult] = useState([]);
const [loading, setLoading] = useState(false);

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

  return (
    <aside>
      <div className="message-tab-info-wrapper">
        <div className="menu-wrapper">
          <h3 className="msg-tab-title">
          Messages{" "}
          <FontAwesomeIcon icon={faCaretDown} />
        </h3>
          <div className="dd-menu">
            
          </div>
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