const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

router.get('/chat-list', chatController.getChatList);
router.get('/chat/:userId', chatController.getChat);

module.exports = router;
