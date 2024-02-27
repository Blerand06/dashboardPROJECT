const express = require("express");
const router = express.Router();
const controller = require("../controller/orderController");

router.post("/add-order", controller.registerOrder);
router.get("/get-orders", controller.getOrders);

module.exports = router;
