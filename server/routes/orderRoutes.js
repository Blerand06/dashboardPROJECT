const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');
const requireAuth = require('../middleware/authMiddleware');

router.post('/add-order', requireAuth, controller.registerOrder);
router.get('/get-orders', requireAuth, controller.getOrders);
router.put('/update-orders', controller.updateOrder);
router.delete('/delete-orders', controller.deleteOrder);

module.exports = router;
