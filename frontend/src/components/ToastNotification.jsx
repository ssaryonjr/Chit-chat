import React, {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWarning,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

function ToastNotification(props) {
    
  return (
    <div className={`toast ${props.showToast && 'active'}`}>
      <div className="toast-content">
        <FontAwesomeIcon icon={faWarning} className="check" />
        <div className="message">
          <span className="text text-1">Action Failed!</span>
          <p className="text text-2">Sam hasn't added this feature yet. Check back later for future updates!</p>
        </div>
      </div>
          <FontAwesomeIcon icon={faXmark} className="close-toast" onClick={props.handleClose} />

      {/* <div className="progress active"></div> */}
    </div>
  );
}

export default ToastNotification