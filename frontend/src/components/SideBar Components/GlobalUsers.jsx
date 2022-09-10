import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faUserPlus,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

function GlobalUsers() {
  return (
    <div className="open-tab">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Start a conversation.."
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <button className="groupchat-btn">
          <FontAwesomeIcon icon={faUserPlus} className="groupchat-icon" />
        </button>
        
      </div>

      <div className="user-list-wrapper">
        <div className="user-list-container">
          <h3 className="user-status-title">Online Users</h3>
          <ul>
            <li className="online-user-wrapper">
              <img
                className="user-status-thumbnail"
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBtYW58ZW58MHx8MHx8&w=1000&q=80"
              />
              <div className="user-status-info">
                <span className="user-status-name">
                  Sam{" "}
                  <img
                    src="https://www.trollishly.com/wp-content/uploads/2021/07/Get-Free-Eligibility-Check.png"
                    alt="verified"
                    className="verified-badge small"
                  />
                </span>

                <span className="user-status-subtitle">Online Now</span>
              </div>
              <span className="user-status-online-indicator green"></span>
            </li>
            <li className="online-user-wrapper">
              <img
                className="user-status-thumbnail"
                src="https://media.istockphoto.com/photos/portrait-of-young-cheerful-african-american-woman-picture-id1207862195?k=20&m=1207862195&s=612x612&w=0&h=wc4k19nXnnogwobNULIwChFpDDZ9dgH5q0BACGs8gyA="
              />
              <div className="user-status-info">
                <span className="user-status-name">Leah Makayeboko</span>
                <span className="user-status-subtitle">Online Now</span>
              </div>
              <span className="user-status-online-indicator green"></span>
            </li>
          </ul>
        </div>

        <div className="user-list-container">
          <h3 className="user-status-title">Offline Users</h3>
          <ul>
            <li className="online-user-wrapper">
              <img
                className="user-status-thumbnail"
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBtYW58ZW58MHx8MHx8&w=1000&q=80"
              />
              <div className="user-status-info">
                <span className="user-status-name">Sam Youngin</span>
                <span className="user-status-subtitle">Offline</span>
              </div>
              <span className="user-status-online-indicator red"></span>
            </li>
            <li className="online-user-wrapper">
              <img
                className="user-status-thumbnail"
                src="https://media.istockphoto.com/photos/portrait-of-young-cheerful-african-american-woman-picture-id1207862195?k=20&m=1207862195&s=612x612&w=0&h=wc4k19nXnnogwobNULIwChFpDDZ9dgH5q0BACGs8gyA="
              />
              <div className="user-status-info">
                <span className="user-status-name">Sam Saryon</span>
                <span className="user-status-subtitle">Offline</span>
              </div>
              <span className="user-status-online-indicator red"></span>
            </li>
            <li className="online-user-wrapper">
              <img
                className="user-status-thumbnail"
                src="https://www.fakepersongenerator.com/Face/female/female2017102593066590.jpg"
              />
              <div className="user-status-info">
                <span className="user-status-name">Sam Saryon</span>
                <span className="user-status-subtitle">Offline</span>
              </div>
              <span className="user-status-online-indicator red"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GlobalUsers