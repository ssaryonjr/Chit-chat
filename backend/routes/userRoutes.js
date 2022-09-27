const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, findUsers, updateOnlineStatus } = require('../controllers/userControllers')

router.post('/', registerUser)
router.get('/', protect, findUsers)
router.post('/login', loginUser)
router.put('/userStatus', protect, updateOnlineStatus)


module.exports = router