const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, findUsers, updateOnlineStatus, getSingularUser } = require('../controllers/userControllers')

router.post('/', registerUser)
router.get('/', protect, findUsers)
router.post('/login', loginUser)
router.put('/userStatus', protect, updateOnlineStatus)
router.get('/:id', protect, getSingularUser)


module.exports = router