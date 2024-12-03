const { Router } = require("express");
const router = Router();
const { messages: ctrl } = require("../controllers");

router.post("/get", ctrl.getMessages);
router.post("/create", ctrl.createMessage);
router.delete("/delete/:id", ctrl.deleteMessage);

module.exports = routerMessages = router;
