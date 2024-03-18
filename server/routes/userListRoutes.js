const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const controller = require('../controller/userListController');

router.post('/add-userlist', controller.registerUserList);
router.get('/get-userlist', requireAuth, controller.getUserList);
router.put('/update-userlist', controller.updateUser);
router.delete('/users', controller.deleteUser);

module.exports = router;
