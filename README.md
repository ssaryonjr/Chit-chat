# Chit-chat <img src="https://i.imgur.com/2CeVDQo.png" alt="" height="40px" width="40px" /> - Messaging App
Chitchat is a free social media platform for users to interact with one another through either single or group chats. Send & receive messages in real time through the means of web sockets and see timestamps of when those messages were sent! <a href="https://chitchat-messenger.herokuapp.com/"><b>Click here</b></a> to sign up now and start networking with other developers!

<p align="center">
<img src="https://github.com/ssaryonjr/ssaryonjr/raw/main/chitchat.gif?raw=true" height="500px" />
</p>

## How It's made: 
<p align="center">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" height=25>
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" height=25>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" height=25>
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" height=25>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" height=25>
<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" height=25>
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" height=25>
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" height=25>
</p>

<b>Technologies & Tools Utilized:</b> React, Node, MongoDB, Express, Mongoose, Socket.io, React Query, HTML & CSS.</b> This project was inspired directly from popular platforms such as Facebook and iMessage, I decided to construct my own version of the software that everday people use to connect with others around the world daily. 

<b>Backend:</b>
- To begin, I initially structured my application using the MVC software architectural pattern, also known as Model-View-Controller. Doing this will allow better modularity across the source code, an easier time with debugging, and a lot of other benefits of keeping the project organized as things scale in the future.
- For my choice of a backend language I went with Node because of its V8 engine that interprets code, its event driven architecture along with my familiarity with already using JavaScript in the front end.
- I went with using MongoDB because NoSQL is extremely useful for unstructured or very large data objects such as chat log data, video, or images and is even used by big companies such as Facebook.
- I leveraged mongoose to help aid in my development with using MongoDB because it's ability to provide schema validations.

<b>Frontend:</b>
- I needed a framework that would give me the ability to create fast user interfaces with complex designs and modularity across my frontend, and for that React was a no brainer!
- One of the main tools I used on the front end was React Query for state managment. The reason I went with React Query over a tool like Redux was because ReactQuery gives a better developer experience for handling API request from the server side & caching while also not having so much boilerplate code.
- Through the means of levarging powerful technologies such as web sockets provided by socket.io I was able to create two way connections between the client and the server which opens up the ability for users to have real time messaging sent and received with very low latency. 

## Features
- Mobile & Desktop Friendly, Message Timestamps, User online/offline status, & User typing animation upon web socket connection.
<p align="center">
<img src="https://i.imgur.com/vA4VY8D.png" width="300px"><img src="https://i.imgur.com/UzhA0dK.png" width="300px">
<img src="https://i.imgur.com/OQhoRd5.png" width="300px">
<img src="https://i.imgur.com/HoM7zKr.png" width="300px">
</p>

- User profiles, Group Chat Creation, Updating Name, Adding & Removing Users Note: Only group creator can remove users)
<p align="center">
<img src="https://i.imgur.com/AJ46T9Z.png" height="300px" width="250px">
<img src="https://i.imgur.com/f0SH6Qs.png" height="300px" width="250px">
<img src="https://i.imgur.com/NjJ04JG.png" height="300px" width="250px">
</p>

## Installation: 
1. Clone repository
2. `npm install`
3. Create `.env` file and replace `MONGO_URI` with yur own Mongo Database offered through Mongo Atlas. 
4. `JWT_SECRET` replace with your Json Webtoken and change `PORT` variable to `5000`
5. run `node server.js`
6. `cd \frontend\` and run `npm start` and react will open up a new tab on port `3000`

## Future Optimizations:
- Email validation to reduce spam and fake users.
- Notifications for finding unread messages.
- Light mode for users who prefer it over dark.
- Emojis and photo attachments.
- Refactor some components.
- Tailwind (maybe..)


<h2 align="center">
More Projects
</h2>
<table bordercolor="#66b2b2">
  <tr>
    <td width="33.3%"  style="align:center;" valign="top">
<a target="_blank" href="https://github.com/ssaryonjr/iReviews" align="center">iReviews</a>
        <br />
      <a target="_blank" href="https://github.com/ssaryonjr/iReviews">
            <img src="https://github.com/ssaryonjr/ssaryonjr/raw/main/ezgif.com-gif-maker%20(1).gif?raw=true" width="100%"  alt="Rigley 2: Flappy Bug"/>
        </a>
    </td>
    <td width="33.3%" valign="top">
<a target="_blank" href="https://github.com/CharlesCreativeContent/matching-card-game"> Matching Card Game</a>
      <br />
        <a target="_blank" href="https://github.com/CharlesCreativeContent/matching-card-game">
          <img src="https://github.com/ssaryonjr/ssaryonjr/raw/main/ezgif.com-gif-maker%20(5).gif?raw=true" width="100%" alt="Matching Card Game"/>
        </a>
    </td>
    <td width="33.3%" valign="top">
<a target="_blank" href="https://github.com/CharlesCreativeContent/Portfolio2021">Portfolio</a>
        <br />
        <a target="_blank" href="https://github.com/CharlesCreativeContent/Portfolio2021/">
          <img src="https://github.com/ssaryonjr/ssaryonjr/raw/main/ezgif.com-gif-maker%20(5).gif?raw=true" width="100%" alt="Portfolio"/>
        </a>
    </td>
  </tr>
</table>
