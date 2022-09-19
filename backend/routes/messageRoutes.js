const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { sendMessage } = require('../controllers/messageControllers')

router.post('/', protect, sendMessage)
// router.get('/:chatId', protect, allMessages)

module.exports = router