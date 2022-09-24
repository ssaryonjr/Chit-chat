const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  sendMessage,
  getAllMessages,
  welcomeMessage
} = require("../controllers/messageControllers");

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, getAllMessages);
router.post("/welcomeMessage", protect, welcomeMessage)

module.exports = router;
