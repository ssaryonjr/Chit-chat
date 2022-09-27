import React, {useContext} from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import ChatContext from '../../ChatContext';
import { timeDifference, isLastMessage, isSameSender } from '../../config/ChatLogic';
import TypingAnimation from './TypingAnimation';



function DisplayMessagesBox({ messages }) {
  //Global states
  const { isTyping, setIsTyping } = useContext(ChatContext);

  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
    const loggedUserId = currentUser._id;
    const currentTime = new Date()
  
  const lastMessage = messages?.[messages?.length - 1]?.sender?._id
  console.log(lastMessage)
  
  return (
    <ScrollableFeed className="all-msg-container">
      {messages &&
        messages.map((m, i) => {
          return (
            <>
              {m?.sender?._id === loggedUserId ? (
                <div className="chat-msg-container right-side" key={i}>
                  <div className="chat-bubble-right">
                    <span className="text-bubble sender">{m?.messageSent}</span>
                    <span className="chat-bubble-time-right">
                      {timeDifference(currentTime, new Date(m?.createdAt))}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="chat-msg-container left-side" key={i}>
                  {isSameSender(messages, m, i, loggedUserId) ||
                  isLastMessage(messages, i, loggedUserId) ? (
                    <>
                      <img
                        src={m?.sender?.profilePic}
                        alt="user profile"
                        className="chat-bubble-user"
                      />
                      <div className="chat-bubble-left">
                        <span className="text-bubble receiver">
                          {m?.messageSent}
                        </span>
                        <span className="chat-bubble-time-left">
                          {timeDifference(currentTime, new Date(m?.createdAt))}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="chat-bubble-left indent">
                      <span className="text-bubble receiver">
                        {m?.messageSent}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          );
        })}
      {isTyping && <TypingAnimation
        latestMessage={lastMessage}
        userId={loggedUserId}
      />}
    </ScrollableFeed>
  );
}

export default DisplayMessagesBox