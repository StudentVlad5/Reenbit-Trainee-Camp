const express = require("express");
const { auth: ctrl } = require("../controllers");
const { ctrlWrapper, authMiddleware } = require("../middleWares");
const { validation, uploadCloud } = require("../middleWares");
const {
  userValidationSchema,
  userUpdateValidationSchema,
} = require("../models");

const router = express.Router();

router.post(
  "/signin",
  // validation(userValidationSchema),
  ctrlWrapper(ctrl.signin)
);
router.post(
  "/signup",
  validation(userValidationSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/logout", ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.logout));
router.post("/", ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.current));

router.patch(
  "/user/:id",
  ctrlWrapper(authMiddleware),
  uploadCloud.single("avatar"),
  validation(userUpdateValidationSchema),
  ctrlWrapper(ctrl.update)
);

module.exports = routerAuth = router;