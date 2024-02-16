const authController = require("./auth.controller");

const router = require("express").Router();

router.use("/send-otp", authController.sendOTP);
router.use("/check-otp", authController.checkOTP);

module.exports = {
  AuthRoutes: router,
};
