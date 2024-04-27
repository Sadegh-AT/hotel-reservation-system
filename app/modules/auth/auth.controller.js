const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");
const CookieName = require("../../constant/cookie.enum");
const RedisDB = require("../../utils/redis-connection");
const { StatusCodes } = require("http-status-codes");
const {
  getToken,
  responseFormatter,
  checkBody,
} = require("../../utils/functions");
const { validationResult } = require("express-validator");
const { validatorHandler } = require("../../utils/error-handler");

class AuthController {
  constructor() {
    autoBind(this);
  }
  async sendOTP(req, res, next) {
    try {
      if (!validationResult(req).isEmpty()) {
        return checkBody(req, res);
      }

      const { mobile } = req.body;
      const resault = await authService.sendOTP(mobile);

      return res.json(
        responseFormatter(
          AuthMessage.SendOtpSuccessfully,
          200,
          resault,
          req,
          false
        )
      );
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      if (!validationResult(req).isEmpty()) {
        return checkBody(req, res);
      }
      const { mobile, code } = req.body;
      const token = await authService.checkOTP(mobile, code);
      res.cookie(CookieName.AccessToken, `Bearer ${token}`, {
        httpOnly: false,
        secure: false,
      });
      return res.json(
        responseFormatter("ورود با موفیقت انجام شد", 200, token, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const token = getToken(req);
      await authService.logoutAccount(token);
      res.clearCookie(CookieName.AccessToken);
      return res.json(
        responseFormatter("شما از حساب خود خارج شدید", 200, {}, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
