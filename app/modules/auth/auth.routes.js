const authController = require("./auth.controller");

const router = require("express").Router();

router.get("/send-otp", authController.sendOTP);
router.get("/check-otp", authController.checkOTP);

module.exports = {
  AuthRoutes: router,
};
