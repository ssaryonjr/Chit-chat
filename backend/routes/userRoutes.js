const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, findUsers } = require('../controllers/userControllers')

router.post('/', registerUser)
router.get('/', protect, findUsers)
router.post('/login', loginUser)


module.exports = router