const express = require("express");
const router = express.Router();
const controller = require("../controller/orderController");

router.post("/add-order", controller.registerOrder);
router.get("/get-orders", controller.getOrders);
router.put("/update-orders", controller.updateOrder);
router.delete("/delete-orders", controller.deleteOrder);

module.exports = router;
