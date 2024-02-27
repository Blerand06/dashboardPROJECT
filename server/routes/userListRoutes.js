const express = require("express");
const router = express.Router();
const controller = require("../controller/userListController");
const { CountryCodes } = require("validator/lib/isISO31661Alpha2");

router.post("/add-userlist", controller.registerUserList);
router.get("/get-userlist", controller.getUserList);
router.put("/update-user/:id", controller.updateUser);

module.exports = router;
