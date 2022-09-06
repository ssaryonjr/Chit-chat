require('dotenv').config();
const express = require("express");
const chats = require("./data/data");

const app = express();

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("API is working baby");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
