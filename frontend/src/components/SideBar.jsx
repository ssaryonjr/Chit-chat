import React, {useState, useContext} from 'react'
import ChatContext from '../ChatContext'
import MessageTab from './SideBar Components/MessagesTab'
import GlobalUsers from './SideBar Components/GlobalUsers'
import Setting from './SideBar Components/Setting'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faGear,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() { 
  const {currentTab, setCurrentTab} = useContext(ChatContext);

  const user = JSON.parse(localStorage.getItem("userData"))
  const {firstName, lastName, profilePic } = user

  // const [currentTab, setCurrentTab] = useState(<MessageTab />)
  


    const changeTab = (e) => {
        const clicked = e.target.id
        if (clicked === 'radio-1') {
            setCurrentTab(<MessageTab />)
        } else if (clicked === 'radio-2') {
            setCurrentTab(<GlobalUsers />)
        } else if (clicked === 'radio-3') {
            setCurrentTab(<Setting />)
        }
    }

  return (
    <aside>
      {/* <div className="user-heading">
        <h1 className="user-title">{firstName} {lastName}</h1>
        <div className="user-thumbnail-container">
          <img src={profilePic} className="user-thumbnail" alt="user thumbnail" />
          <span className="user-ping"></span>
        </div>
      </div> */}

      {currentTab}

      <nav>
        <div className="tabs">
          <input
            type="radio"
            id="radio-1"
            name="tabs"
            onClick={changeTab}
          />
          <label className="tab" htmlFor="radio-1">
            <FontAwesomeIcon icon={faComments} className="nav-icon" />
          </label>
          <input
            type="radio"
            id="radio-2"
            name="tabs"
            defaultChecked={true}
            onClick={changeTab}
          />
          <label className="tab" htmlFor="radio-2">
            <FontAwesomeIcon icon={faUserGroup} className="nav-icon" />
          </label>
          <input type="radio" id="radio-3" name="tabs" onClick={changeTab} />
          <label className="tab" htmlFor="radio-3">
            <FontAwesomeIcon icon={faGear} className="nav-icon" />
          </label>
          <span className="glider"></span>
        </div>
      </nav>
    </aside>
  );
}

export default SideBar