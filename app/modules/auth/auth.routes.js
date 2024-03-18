const { AuthorizationGuard } = require("../../middleware/authorization.guard");
const authController = require("./auth.controller");

const router = require("express").Router();

router.get("/send-otp", authController.sendOTP);
router.get("/check-otp", authController.checkOTP);
router.get("/logout", AuthorizationGuard, authController.logout);

module.exports = {
  AuthRoutes: router,
};
