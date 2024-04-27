const { AuthorizationGuard } = require("../../middleware/authorization.guard");
const authController = require("./auth.controller");
const { sendOtpValidation } = require("./auth.validator");

const router = require("express").Router();

router.get("/send-otp", sendOtpValidation(), authController.sendOTP);
router.get("/check-otp", authController.checkOTP);
router.get("/logout", AuthorizationGuard, authController.logout);

module.exports = {
  AuthRoutes: router,
};
