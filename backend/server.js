require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000
const colors = require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
connectDB()

const app = express();


//Middleware that parses incoming JSON request and puts the data in req.body 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API Endpoint Routes
app.use('/api/user', require("./routes/userRoutes"))
app.use('/api/chat', require("./routes/chatRoutes"))

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`.bgBlue);
});

//Error handling
app.use(notFound)
app.use(errorHandler)