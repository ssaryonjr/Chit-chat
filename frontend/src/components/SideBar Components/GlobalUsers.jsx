import React, { useState, useEffect } from "react";
import OnlineUsers from "./OnlineUsers";
import SearchResult from "./SearchResult";
import { useQuery } from 'react-query'
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";


function GlobalUsers() {
  const [search, setSearch] = useState("");
  const [showOnlineBoard, setShowOnlineBoard] = useState(true);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  //User info
  const user = JSON.parse(localStorage.getItem("userData"));
  axios.defaults.headers.common.Authorization = `Bearer ${user.token}`

  const { data, isLoading, error, isIdle } = useQuery(["searchUser", search], async () => {
    const { data } = await axios.get(`/api/user?search=${search}`)
    return data
  }, {
      enabled: Boolean(search)
    }
  );

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
          <FontAwesomeIcon icon={faUserPlus} className="groupchat-icon" />
        </button>
      </div>

      {isIdle
        ? <OnlineUsers />
        : <SearchResult
          loading={isLoading}
          data={data}
        />
      }
    </div>
  );
}

export default GlobalUsers;


  // useEffect(() => {
  //   if (search === "") {
  //     setShowOnlineBoard(true);
  //   }

  //   if (search !== "") {
  //     setShowOnlineBoard(false);

  //     const fetchUsers = async () => {
  //       try {
  //         setLoading(true);

  //         const config = { headers: { Authorization: `Bearer ${user.token}` } };

  //         const { data } = await axios.get(
  //           `/api/user?search=${search}`,
  //           config
  //         );
  //         setLoading(false);
  //         setSearchResult(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchUsers();
  //   }
  // }, [search]);