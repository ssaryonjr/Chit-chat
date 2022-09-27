import React from 'react'

function TypingAnimation(props) {
  const messageId = props.latestMessage 
  const loggedUserId = props.userId
  return (
    <div class="typing-chat-bubble" style={{marginLeft: messageId !== loggedUserId ? '5.4rem' : '1.9rem'}}>
      <div class="typing">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  );
}

export default TypingAnimation