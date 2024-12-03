const express = require("express");
const { users: ctrl } = require("../controllers");
const { ctrlWrapper } = require("../middleWares");


const router = express.Router();

router.post(
  "/:id",
  ctrlWrapper(ctrl.getAllUsers)
);

module.exports = routerUsers = router;