require('dotenv').config();
const express = require("express");
const cors = require('cors')
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000
const colors = require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
connectDB()
const path = require("path");

const app = express();
app.use(cors())


//Middleware that parses incoming JSON request and puts the data in req.body 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API Endpoint Routes
app.use('/api/user', require("./routes/userRoutes"))
app.use('/api/chat', require("./routes/chatRoutes"))
app.use('/api/message', require("./routes/messageRoutes"))

// --------------------------deployment------------------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/build/")));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to node_env to production'))
}

// --------------------------deployment------------------------------

//Error handling
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`.bgBlue);
});


//Initiating Socket.io
const io = require("socket.io")(server, {
  pingTimeOut: 60000, //Close connection after inactivity for 60 seconds.
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log('connected to socket.io')
  socket.on('setup', (userData) => {
    socket.join(userData._id)
    console.log(`${userData.firstName} is online.`)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log(`User joined room: ${room}`)
  })

  socket.on('typing', (room) => {
    console.log('user is typing')
    return socket.in(room).emit("typing", room)
  })

   socket.on("stop typing", (room) => {
     return socket.in(room).emit("stop typing", room);
   });

  socket.on('new message', (newMessageReceived) => {
    socket.broadcast.emit('message received',  newMessageReceived)
  })

  socket.on("disconnect", () => {
    console.log('USER DISCONNECTED')
    socket.disconnect()
  
  })
})



