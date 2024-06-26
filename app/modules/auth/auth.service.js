const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createError = require("http-errors");
const { randomInt } = require("crypto");
const AuthMessage = require("./auth.messages");
const RedisDB = require("../../utils/redis-connection");
const { signToken } = require("../../utils/token-manager");
const RedisKey = require("../../constant/redis.key");
class AuthService {
  constructor() {
    autoBind(this);
  }

  async sendOTP(mobile) {
    const user = await UserModel.findOne(
      { mobile },
      { mobile: 1, otp: 1, verifiedMobile: 1 }
    );

    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 60000,
    };
    if (!user) {
      const newUser = await UserModel.create({ mobile, otp });
      return newUser.otp.code;
    }

    if (user.otp && user.otp.expiresIn > now) {
      throw createError.BadRequest(AuthMessage.OtpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    return {
      code: user.otp.code,
    };
  }
  async checkOTP(mobile, code) {
    const user = await UserModel.findOne({ mobile });
    const now = new Date().getTime();
    if (!user) throw createError.NotFound(AuthMessage.UserNotFound);
    if (user.otp.expiresIn < now) {
      throw createError.Unauthorized(AuthMessage.OtpCodeExpired);
    }
    if (user.otp.code !== code) {
      throw createError.Unauthorized(AuthMessage.OtpCodeIncorrect);
    }
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
    }
    const accessToken = await signToken({
      mobile,
      id: user._id,
      verifiedMobile: user.verifiedMobile,
    });
    await user.save();
    return accessToken;
  }
  async logoutAccount(token) {
    try {
      await RedisDB.sadd(RedisKey.LoggedOutTokens, token);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new AuthService();
