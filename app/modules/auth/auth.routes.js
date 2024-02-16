const authController = require("./auth.controller");

const router = require("express").Router();

router.use("/send-otp", authController.sendOTP);

module.exports = {
  AuthRoutes: router,
};
