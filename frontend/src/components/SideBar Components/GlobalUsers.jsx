import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../../ChatContext";
import OnlineUsers from "./OnlineUsers";
import SearchResult from "./SearchResult";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserPlus,
  faUsers
} from "@fortawesome/free-solid-svg-icons";


function GlobalUsers() {
  const { search, setSearch } = useContext(ChatContext);

  // const [search, setSearch] = useState("");
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
        setLoading(true)
        const user = JSON.parse(localStorage.getItem("userData"));
        const config = { headers: { Authorization: `Bearer ${user.token}` } }
        
        const { data } = await axios.get(`/api/user?search=${search}`, config)
          setLoading(false)
          setSearchResult(data)

      } catch (error) {
          console.log(error)
      }
      }

      fetchUsers()
      
    }
  }, [search]);



  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div className="open-tab">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Start a conversation.."
          value={search}
          onChange={handleSearchInput}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <button className="groupchat-btn">
          <FontAwesomeIcon icon={faUsers} className="groupchat-icon" />
        </button>
      </div>

      {showOnlineBoard ? (
        <OnlineUsers />
      ) : (
          <SearchResult
            loading={loading}
            data={searchResult}
          />
      )}
    </div>
  );
}

export default GlobalUsers;
