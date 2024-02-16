const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");

class AuthController {
  constructor() {
    autoBind(this);
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const resault = await authService.sendOTP(mobile);

      return res.json({
        data: resault,
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
