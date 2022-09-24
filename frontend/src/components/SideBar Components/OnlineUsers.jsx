import React from 'react'

function OnlineUsers() {
  return (
    <div className="user-list-wrapper">
      <div className="user-list-container">
        <h3 className="user-status-title">• Online Users</h3>
        <ul>
          <li className="online-user-wrapper">
            <img
              className="user-status-thumbnail"
              src="https://media.istockphoto.com/photos/portrait-of-young-cheerful-african-american-woman-picture-id1207862195?k=20&m=1207862195&s=612x612&w=0&h=wc4k19nXnnogwobNULIwChFpDDZ9dgH5q0BACGs8gyA="
            />
            <div className="user-status-info">
              <span className="user-status-name">Leah Young</span>
              <span className="user-status-subtitle">Online Now</span>
            </div>
            <span className="user-status-online-indicator green"></span>
          </li>
        </ul>
      </div>

      <div className="user-list-container">
        <h3 className="user-status-title-offline">• Offline Users</h3>
        <ul>
          <li className="online-user-wrapper">
            <img
              className="user-status-thumbnail"
              src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBtYW58ZW58MHx8MHx8&w=1000&q=80"
            />
            <div className="user-status-info">
              <span className="user-status-name">Sam Smith</span>
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
        
        
          
        </ul>
      </div>
    </div>
  );
}

export default OnlineUsers