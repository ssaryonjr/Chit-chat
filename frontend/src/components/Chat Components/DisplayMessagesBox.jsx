import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { timeDifference } from '../../config/ChatLogic';

function DisplayMessagesBox({ messages }) {
  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
    const loggedUserId = currentUser._id;
    const currentTime = new Date()
    
  return (
    <ScrollableFeed className='all-msg-container'>
      {messages &&
        messages.map((m, i) => {
            return (
              <>
                {m?.sender?._id === loggedUserId ? (
                  <div className="chat-msg-container right-side" key={i}>
                    <div className="chat-bubble-right">
                      <span className="text-bubble sender">
                        {m?.messageSent}
                      </span>
                      <span className='chat-bubble-time-right'>
                        {timeDifference(currentTime, new Date(m?.createdAt))}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="chat-msg-container left-side" key={i}>
                    <img
                      src={m?.sender?.profilePic}
                      alt="user profile"
                      className="chat-bubble-user"
                    />
                    <div className="chat-bubble-left">
                      <span className="text-bubble receiver">
                        {m?.messageSent}
                      </span>
                      <span className='chat-bubble-time-left'>
                        {timeDifference(currentTime, new Date(m?.createdAt))}
                      </span>
                    </div>
                  </div>
                )}
              </>
            );
        })}
    </ScrollableFeed>
  );
}

export default DisplayMessagesBox