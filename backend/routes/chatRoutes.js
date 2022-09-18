const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const { chatAccess, fetchAllChat, createGroupChat, renameGroupChat, addGcUser, removeGcUser, openSingleChat } = require('../controllers/chatControllers')

router.post('/', protect, chatAccess)
router.get('/', protect, fetchAllChat)
router.get('/:id', protect, openSingleChat)

router.post('/groupChat', protect, createGroupChat)
router.put('/renameGc', protect, renameGroupChat)
router.put('/removeGcUser', protect, removeGcUser)
router.put("/addGcUser", protect, addGcUser);

module.exports = router  