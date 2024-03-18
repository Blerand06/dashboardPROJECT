const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/:id', requireAuth, messageController.getMessages);
router.post('/send/:id', requireAuth, messageController.sendMessage);

module.exports = router;
