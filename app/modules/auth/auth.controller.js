const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");
const CookieName = require("../../constant/cookie.enum");
const RedisDB = require("../../utils/redis-connection");
const { StatusCodes } = require("http-status-codes");
const { getToken, responseFormatter } = require("../../utils/functions");

class AuthController {
  constructor() {
    autoBind(this);
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const resault = await authService.sendOTP(mobile);
      const metadata = {
        
      }
      return res.json(
        responseFormatter(
          AuthMessage.SendOtpSuccessfully,
          StatusCodes.OK,
          resault,
          [],
          false
        )
      );
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
      res.cookie(CookieName.AccessToken, `Bearer ${token}`, {
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
  async logout(req, res, next) {
    try {
      const token = getToken(req);
      await authService.logoutAccount(token);
      res.clearCookie(CookieName.AccessToken);
      return res.json({
        message: "شما از حساب خود خارج شدید",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
