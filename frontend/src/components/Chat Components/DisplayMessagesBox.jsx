import React, {useContext} from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import ChatContext from '../../ChatContext';
import { timeDifference, isLastMessage, isSameSender } from '../../config/ChatLogic';
import TypingAnimation from './TypingAnimation';
import axios from "axios";



function DisplayMessagesBox({ messages }) {
  //Global states
  const { selectedChat, userIsTyping, setProfile, setShowUserProfile } =
    useContext(ChatContext);

  const roomId = selectedChat?._id;
  const isTyping = userIsTyping[roomId]; //True or false

  //User info
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  const loggedUserId = currentUser._id;
  const currentTime = new Date();

  const lastMessage = messages?.[messages?.length - 1]?.sender?._id;

  //Grabs user ID that's clicked and displays profile modal.
  const getUserProfile = async (id) => {
    if (!id) return;
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      setProfile(data);
      setShowUserProfile(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollableFeed className="all-msg-container">
      {messages &&
        messages.map((m, i) => {
          return (
            <>
              {m?.sender?._id === loggedUserId ? (
                <div
                  className="chat-msg-container right-side"
                  key={m?.sender?._id}
                >
                  <div className="chat-bubble-right" key={m?.sender?._id}>
                    <span className="text-bubble sender">{m?.messageSent}</span>
                    <span className="chat-bubble-time-right">
                      {timeDifference(currentTime, new Date(m?.createdAt))}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="chat-msg-container left-side"
                  key={m?.sender?._id}
                >
                  {isSameSender(messages, m, i, loggedUserId) ||
                  isLastMessage(messages, i, loggedUserId) ? (
                    <>
                      <img
                        src={m?.sender?.profilePic}
                        alt="user profile"
                        className="chat-bubble-user"
                        onClick={()=> getUserProfile(m?.sender?._id)}
                      />
                      <div className="chat-bubble-left" key={i}>
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
      {isTyping && (
        <TypingAnimation latestMessage={lastMessage} userId={loggedUserId} />
      )}
    </ScrollableFeed>
  );
}

export default DisplayMessagesBox