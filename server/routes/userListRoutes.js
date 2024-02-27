const express = require("express");
const router = express.Router();
const controller = require("../controller/userListController");

router.post("/add-userlist", controller.registerUserList);
router.get("/get-userlist", controller.getUserList);

module.exports = router;


