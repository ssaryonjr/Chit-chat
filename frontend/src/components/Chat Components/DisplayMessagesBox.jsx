import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

function DisplayMessagesBox({messages}) {
  return (
    <ScrollableFeed>
          {messages && messages.map((m, i) => {
              return<h1 key={i}>{m?.messageSent}</h1>
        })}
    </ScrollableFeed>
  )
}

export default DisplayMessagesBox