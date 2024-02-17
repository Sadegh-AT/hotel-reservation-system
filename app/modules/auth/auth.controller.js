const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");
const CookieName = require("../../constant/cookie.enum");

class AuthController {
  constructor() {
    autoBind(this);
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const resault = await authService.sendOTP(mobile);

      return res.json({
        code: resault,
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await authService.checkOTP(mobile, code);
      res.cookie(CookieName.AccessToken, token, {
        httpOnly: false,
        secure: false,
      });
      return res.json({
        data: token,
        message: "ورود با موفیقت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
