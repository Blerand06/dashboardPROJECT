const express = require("express");
const router = express.Router();
const services = require("../services/render");
const requireAuth = require("../middleware/authMiddleware");
const controller = require("../controller/authController");

// Using services (Renders)

router.get("/", requireAuth, services.mainPage);
router.get("/signup", services.signupPage);
router.get("/login", services.loginPage);
router.get("/update-user/:id", requireAuth, services.updateUser);
router.get("/messages", requireAuth, services.messageRoom);
router.get(
  "/orders",
  requireAuth,
  controller.restrict("admin"),
  services.orders
);
router.get(
  "/new-orders",
  requireAuth,
  controller.restrict("admin"),
  services.newOrders
);
router.get("/users", requireAuth, controller.restrict("admin"), services.users);
router.get(
  "/new-user",
  requireAuth,
  controller.restrict("admin"),
  services.newUser
);

module.exports = router;
